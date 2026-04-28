import { useTranslation } from "react-i18next";
export function ProfileCompletion() {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="font-semibold mb-4">Profile Completion</h3>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-navy h-2 rounded-full w-[85%]" />
            </div>

            {/* Checklist */}
            <ul className="text-sm space-y-2">
                <li className="flex justify-between items-center">
                    <span>Upload IELTS</span>
                    <span className="text-gold text-xs">Complete</span>
                </li>

                <li className="flex justify-between items-center">
                    <span>Personal Statement</span>
                    <span className="text-gold text-xs">Complete</span>
                </li>
            </ul>
        </div>
    );
}