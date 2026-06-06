import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

{/* Public Domain */}
import MainPage from "../features/Main/pages/MainPage" /* Evita el fallback y que de una rapida primera impresión */
import LoginPage from "../features/Auth/pages/Login" /* Formularios, no es necesario el Lazy */
import RegisterPage from "../features/Auth/pages/Register" /* Formularios, no es necesario el Lazy */

{/* Private Domain */}
const StelarMap = lazy(() => import('../features/Skyview/pages/MainCSphere'));
const AstroHub = lazy(() => import('../features/AstroHub/pages/MainForum'));
const Profile = lazy(() => import('../features/UserProfile/pages/Profile'));
const Settings = lazy(() => import('../features/UserProfile/pages/Settings'));

{/* Fallback */}
import Fallback_page from "../features/Fallback/Loading_Fallback"


export const AppRouter: React.FC = () => {
    return(
        <BrowserRouter>
            <Suspense fallback={<Fallback_page />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace/>} />
                    
                    <Route path="/home" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <Route path="/test" element={<Fallback_page />} /> */}

                    <Route element={<ProtectedRoute />}>
                        <Route path="/AstroHub" element={<AstroHub />} />
                        <Route path="/SkyMap" element={<StelarMap />} />

                        {/* Users */}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}