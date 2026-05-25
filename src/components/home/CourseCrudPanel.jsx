import { useState } from "react";
import { courses as initialCourses } from "../../assets/data/courses";

const emptyForm = {
    title: "",
    description: "",
    instructor: "",
    role: "",
    company: "",
    image: "",
    avatar: "",
    category: "Semua Kelas",
    price: "",
    duration: "0",
};

const toPriceLabel = (value) => {
    const digits = value.replace(/[^0-9]/g, "");
    return digits ? `Rp ${digits}K` : "";
};

const toPriceInput = (value) => value.replace(/[^0-9]/g, "");

const defaultImageSet = new Set(initialCourses.map((course) => course.image));
const defaultAvatarSet = new Set(initialCourses.map((course) => course.avatar));

const toEditableUrl = (value, defaultSet) => (defaultSet.has(value) ? "" : value);

export default function CourseCrudPanel({ categories, onCreate, onUpdate, onDelete, items }) {
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.instructor.trim() || !form.price.trim()) return;

        const payload = { ...form, price: toPriceLabel(form.price) };

        if (editingId) {
            onUpdate(editingId, payload);
        } else {
            onCreate(payload);
        }

        setForm(emptyForm);
        setEditingId(null);
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setForm({
            title: item.title,
            description: item.description || "",
            instructor: item.instructor,
            role: item.role || "",
            company: item.company || "",
            image: toEditableUrl(item.image || "", defaultImageSet),
            avatar: toEditableUrl(item.avatar || "", defaultAvatarSet),
            category: item.category,
            price: toPriceInput(item.price),
            duration: item.duration || "0",
        });
    };

    return (
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-soft">
            <h3 className="mb-4 text-lg font-semibold text-brand-dark">CRUD Kelas</h3>

            <form onSubmit={submit} className="grid grid-cols-1 gap-3 md2:grid-cols-2">
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Judul Kelas</label>
                    <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Masukkan judul" className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Nama Instructor</label>
                    <input value={form.instructor} onChange={(e) => setForm((p) => ({ ...p, instructor: e.target.value }))} placeholder="Masukkan instructor" className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div className="md2:col-span-2">
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Description</label>
                    <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Masukkan deskripsi kelas" className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Role</label>
                    <input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} placeholder="Contoh: Senior Engineer" className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Company</label>
                    <input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} placeholder="Contoh: Gojek" className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Image URL</label>
                    <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} placeholder="https://..." className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Avatar URL</label>
                    <input value={form.avatar} onChange={(e) => setForm((p) => ({ ...p, avatar: e.target.value }))} placeholder="https://..." className="h-12 w-full rounded-md border border-gray-200 px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Kategori</label>
                    <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20">
                        {categories.map((cat) => <option key={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="mb-2 inline-block text-sm sm:text-base text-slate-600">Harga</label>
                    <div className="flex h-12 w-full items-center rounded-md border border-gray-200 px-3 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20">
                        <span className="mr-2 text-sm sm:text-base text-slate-600">Rp</span>
                        <input type="number" min="0" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: toPriceInput(e.target.value) }))} placeholder="150" className="h-full w-full border-0 p-0 text-sm sm:text-base outline-none" />
                        <span className="ml-2 text-sm sm:text-base text-slate-600">K</span>
                    </div>
                </div>
                <div className="md2:col-span-2 flex gap-3">
                    <button type="submit" className="h-11 rounded-xl bg-brand-primary px-5 text-sm sm:text-base font-bold text-white transition hover:brightness-95">{editingId ? "Update" : "Create"}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm sm:text-base font-bold text-slate-600 transition hover:bg-gray-50">Cancel</button>}
                </div>
            </form>

            <div className="mt-4 space-y-2">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
                        <p className="text-sm text-slate-600 line-clamp-1">{item.title}</p>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="rounded-md bg-brand-soft px-3 py-1 text-xs font-medium text-brand-primary transition hover:bg-green-100">Edit</button>
                            <button onClick={() => onDelete(item.id)} className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
