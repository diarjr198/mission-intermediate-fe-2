import { useEffect, useMemo, useState } from "react";

export default function useCourseFilterState(courses) {
    const [selectedCategories, setSelectedCategories] = useState(["Semua Kelas"]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Urutkan");
    const [currentPage, setCurrentPage] = useState(1);

    const handleReset = () => {
        setSelectedCategories(["Semua Kelas"]);
        setSelectedPrices([]);
        setSelectedDuration("");
        setSearchQuery("");
        setSortBy("Urutkan");
    };

    const toggleCategory = (category) => {
        if (category === "Semua Kelas") {
            setSelectedCategories(["Semua Kelas"]);
            return;
        }

        const withoutAll = selectedCategories.filter((c) => c !== "Semua Kelas");
        if (withoutAll.includes(category)) {
            const next = withoutAll.filter((c) => c !== category);
            setSelectedCategories(next.length ? next : ["Semua Kelas"]);
        } else {
            setSelectedCategories([...withoutAll, category]);
        }
    };

    const togglePrice = (price) => {
        setSelectedPrices((prev) =>
            prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
        );
    };

    const toggleDuration = (duration) => {
        setSelectedDuration((prev) => (prev === duration ? "" : duration));
    };

    const filteredCourses = useMemo(() => {
        let result = [...courses];

        if (!selectedCategories.includes("Semua Kelas")) {
            result = result.filter((c) => selectedCategories.includes(c.category));
        }

        if (selectedPrices.length > 0) {
            result = result.filter((c) => {
                const value = parseInt(c.price.replace(/[^0-9]/g, ""), 10) * 1000;
                return selectedPrices.some((p) => {
                    if (p === "Gratis") return value === 0;
                    if (p === "< Rp 200K") return value < 200000;
                    if (p === "Rp 200K - Rp 400K") return value >= 200000 && value <= 400000;
                    if (p === "> Rp 400K") return value > 400000;
                    return false;
                });
            });
        }

        if (selectedDuration) {
            result = result.filter((c) => {
                const durationValue = parseFloat(c.duration) || 0;
                if (selectedDuration === "< 5 Jam") return durationValue < 5;
                if (selectedDuration === "5 - 10 Jam") return durationValue >= 5 && durationValue <= 10;
                if (selectedDuration === "> 10 Jam") return durationValue > 10;
                return true;
            });
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (c) => c.title.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query)
            );
        }

        switch (sortBy) {
            case "Terpopuler":
                result.sort((a, b) => b.reviews - a.reviews);
                break;
            case "Rating Tertinggi":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "Harga Terendah":
                result.sort(
                    (a, b) =>
                        parseInt(a.price.replace(/[^0-9]/g, ""), 10) -
                        parseInt(b.price.replace(/[^0-9]/g, ""), 10)
                );
                break;
            case "Harga Tertinggi":
                result.sort(
                    (a, b) =>
                        parseInt(b.price.replace(/[^0-9]/g, ""), 10) -
                        parseInt(a.price.replace(/[^0-9]/g, ""), 10)
                );
                break;
            default:
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [courses, selectedCategories, selectedPrices, selectedDuration, searchQuery, sortBy]);

    const coursesPerPage = 6;
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const paginatedCourses = useMemo(
        () =>
            filteredCourses.slice(
                (currentPage - 1) * coursesPerPage,
                currentPage * coursesPerPage
            ),
        [filteredCourses, currentPage]
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedPrices, selectedDuration, searchQuery, sortBy]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return {
        selectedCategories,
        selectedPrices,
        selectedDuration,
        searchQuery,
        sortBy,
        currentPage,
        totalPages,
        paginatedCourses,
        filteredCourses,
        setSearchQuery,
        setSortBy,
        setCurrentPage,
        handleReset,
        toggleCategory,
        togglePrice,
        toggleDuration,
    };
}
