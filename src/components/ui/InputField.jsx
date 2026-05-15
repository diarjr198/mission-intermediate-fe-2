export default function InputField({
    id,
    label,
    type = "text",
    name,
    required = false,
    children,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 inline-block text-sm text-slate-600 sm:text-base"
            >
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <div className={children ? "relative" : ""}>
                <input
                    id={id}
                    type={type}
                    name={name}
                    className="h-12 w-full rounded-md border border-gray-200 px-3 pr-11 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 sm:text-base"
                />
                {children}
            </div>
        </div>
    );
}
