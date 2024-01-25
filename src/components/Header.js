import React from "react";
import "../css/Header.css"

const PageHeader = () => {
    return (
        <div className="header shadow-lg border-2 border-blue-200">
            <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 dark:bg-neutral-800 py-5 shadow-md h-20">
                <div className="flex container mx-auto px-4 lg:flex lg:items-center lg:justify-between gap-52">
                    <div className="flex items-center flex-row justify-center gap-8">
                        <h1 className="text-2xl text-gray-600 font-bold dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                            Dental Admin
                        </h1>
                    </div>
                    <ul className="flex space-x-8">
                        <li>
                            <a
                                href="/home"
                                className="text-2xl text-gray-600 font-bold dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <a
                                href="/myClients"
                                className="text-2xl text-gray-600 font-bold dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                            >
                                My Clients
                            </a>
                        </li>
                        <li>
                            <a
                                href="/appointment/approval"
                                className="text-2xl text-gray-600 font-bold dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                            >
                                For Approval
                            </a>
                        </li>
                        <li>
                            <a
                                href="/appointment/history"
                                className="text-2xl text-gray-600 font-bold dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                            >
                                Appointment History
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default PageHeader;