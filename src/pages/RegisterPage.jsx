import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/layout/AuthNavbar";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import EyeIcon from "../components/ui/EyeIcon";
import Divider from "../components/ui/Divider";
import GoogleIcon from "../components/ui/GoogleIcon";

export default function RegisterPage() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/home");
    };

    return (
        <div className="bg-brand-cream font-sans text-brand-dark min-h-screen">
            <AuthNavbar />
            <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <AuthCard
                    title="Pendaftaran Akun"
                    subtitle="Yuk, daftarkan akunmu sekarang juga!"
                >
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <InputField
                            id="fullname"
                            label="Nama Lengkap"
                            type="text"
                            name="fullname"
                            required
                        />

                        {/* Email */}
                        <InputField
                            id="email"
                            label="E-mail"
                            type="email"
                            name="email"
                            required
                        />

                        {/* Gender (mobile only) */}
                        <div className="block sm:hidden">
                            <label
                                htmlFor="gender"
                                className="mb-2 inline-block text-sm text-slate-600"
                            >
                                Jenis Kelamin{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                            >
                                <option value="#">--- Pilih ---</option>
                                <option value="female">Wanita</option>
                                <option value="male">Pria</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 inline-block text-sm text-slate-600 sm:text-base"
                            >
                                No. HP <span className="text-red-600">*</span>
                            </label>
                            <div className="flex gap-3">
                                <div className="flex h-12 w-[40%] min-w-[120px] overflow-hidden rounded-md border border-gray-200 sm:w-[30%]">
                                    <div className="flex items-center border-r border-gray-200 bg-gray-50 px-3">
                                        <img
                                            src="https://flagcdn.com/w40/id.png"
                                            alt="ID"
                                            className="h-[14px] w-5 rounded-[2px] object-cover"
                                        />
                                    </div>
                                    <select
                                        name="code"
                                        className="h-full w-full border-0 bg-white px-2 text-sm outline-none sm:text-base"
                                    >
                                        <option value="62">+62</option>
                                    </select>
                                </div>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    className="h-12 flex-1 rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <InputField
                            id="password"
                            label="Kata Sandi"
                            type="password"
                            name="password"
                            required
                        >
                            <EyeIcon />
                        </InputField>

                        {/* Confirm Password */}
                        <InputField
                            id="password2"
                            label="Konfirmasi Kata Sandi"
                            type="password"
                            name="password2"
                            required
                        >
                            <EyeIcon />
                        </InputField>

                        {/* Forgot Password link */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-600 hover:text-brand-primary sm:text-base"
                            >
                                Lupa Password?
                            </a>
                        </div>

                        {/* Register */}
                        <Button variant="primary" type="submit">
                            Daftar
                        </Button>

                        {/* Login redirect */}
                        <Button
                            variant="soft"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Masuk
                        </Button>
                    </form>

                    <Divider />

                    {/* Google SSO */}
                    <Button variant="outline" onClick={() => navigate("/home")}>
                        <GoogleIcon />
                        Daftar dengan Google
                    </Button>
                </AuthCard>
            </main>
        </div>
    );
}
