import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/layout/AuthNavbar";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import EyeIcon from "../components/ui/EyeIcon";
import Divider from "../components/ui/Divider";
import GoogleIcon from "../components/ui/GoogleIcon";

export default function LoginPage() {
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
                    title="Masuk ke Akun"
                    subtitle="Yuk, lanjutin belajarmu di videobelajar."
                >
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <InputField
                            id="email"
                            label="E-mail"
                            type="email"
                            name="email"
                            required
                        />

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

                        {/* Forgot password */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-600 hover:text-brand-primary sm:text-base"
                            >
                                Lupa Password?
                            </a>
                        </div>

                        {/* Submit */}
                        <Button variant="primary" type="submit">
                            Masuk
                        </Button>

                        {/* Register redirect */}
                        <Button
                            variant="soft"
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Daftar
                        </Button>
                    </form>

                    <Divider />

                    {/* Google SSO */}
                    <Button variant="outline" onClick={() => navigate("/home")}>
                        <GoogleIcon />
                        Masuk dengan Google
                    </Button>
                </AuthCard>
            </main>
        </div>
    );
}
