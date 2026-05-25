import { useEffect, useState } from "react";
import { courses as initialCourses } from "../assets/data/courses";

const STORAGE_KEY = "courses-store-v1";
const STORAGE_EVENT = "courses-store-updated";

const readStoredCourses = () => {
    if (typeof window === "undefined") return initialCourses;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return initialCourses;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : initialCourses;
    } catch {
        return initialCourses;
    }
};

const readStoredRaw = () => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(STORAGE_KEY) || "";
};

const toRaw = (value) => JSON.stringify(value);

export default function useCoursesStore() {
    const [courseItems, setCourseItems] = useState(readStoredCourses);

    useEffect(() => {
        const syncFromStorage = () => {
            const nextRaw = readStoredRaw();
            const currentRaw = toRaw(courseItems);
            if (nextRaw === currentRaw) return;
            setCourseItems(readStoredCourses());
        };

        window.addEventListener("storage", syncFromStorage);
        window.addEventListener(STORAGE_EVENT, syncFromStorage);

        return () => {
            window.removeEventListener("storage", syncFromStorage);
            window.removeEventListener(STORAGE_EVENT, syncFromStorage);
        };
    }, [courseItems]);

    useEffect(() => {
        const nextRaw = toRaw(courseItems);
        const currentRaw = readStoredRaw();
        if (currentRaw !== nextRaw) {
            window.localStorage.setItem(STORAGE_KEY, nextRaw);
            window.dispatchEvent(new Event(STORAGE_EVENT));
        }
    }, [courseItems]);

    const createCourse = (payload) => {
        setCourseItems((prev) => {
            const nextId = prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1;
            return [
                {
                    id: nextId,
                    title: payload.title,
                    description: payload.description || "Kelas tambahan dari CRUD panel.",
                    image: payload.image || prev[0]?.image || initialCourses[0].image,
                    instructor: payload.instructor,
                    role: payload.role || "Instructor",
                    company: payload.company || "",
                    avatar: payload.avatar || prev[0]?.avatar || initialCourses[0].avatar,
                    rating: 5,
                    reviews: 1,
                    price: payload.price,
                    category: payload.category,
                    duration: payload.duration || "0",
                },
                ...prev,
            ];
        });
    };

    const updateCourse = (id, payload) => {
        setCourseItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        title: payload.title,
                        description: payload.description,
                        image: payload.image || item.image,
                        instructor: payload.instructor,
                        role: payload.role,
                        company: payload.company,
                        avatar: payload.avatar || item.avatar,
                        category: payload.category,
                        price: payload.price,
                        duration: payload.duration,
                    }
                    : item
            )
        );
    };

    const deleteCourse = (id) => {
        setCourseItems((prev) => prev.filter((item) => item.id !== id));
    };

    return { courseItems, createCourse, updateCourse, deleteCourse };
}
