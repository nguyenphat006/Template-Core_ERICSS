"use client"

import { useSelector, useDispatch } from "react-redux";
import { closeAlert, confirmAction } from "@/lib/features/alert/alertSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { ReactNode } from "react";

type Alert = {
    open: boolean,
    icon: ReactNode,
    message: string,
    title: string,
    btnColor: string
}


export default function Alert() {
    const { open, icon, message, title, btnColor } = useSelector((state: { alert: Alert }) => state.alert);
    const dispatch = useDispatch();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => dispatch(closeAlert())}
                    className="bg-slate-900/90 backdrop-blur p-8 fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll cursor-pointer "
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[var(--card)] h-auto min-h-[175px] flex flex-col justify-between text-white py-5 px-7 md:px-7 rounded-lg w-full max-w-[544px] shadow-xl cursor-default relative"
                    >

                        <div className="flex flex row gap-4">
                            <div className="">{icon}</div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-lg">{title}</h2>
                                <span>{message}</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end gap-3">
                            <Button
                                className={`py-6 px-5 border border-[#333741] text-white bg-[#161B26] rounded-md font-bold text-md`}
                                onClick={() => dispatch(closeAlert())}>Hủy bỏ</Button>
                            <Button
                                className={`py-6 px-5 border border-[#333741] text-white rounded-md font-bold text-md`}
                                style={{backgroundImage: `${btnColor}`}}
                                onClick={() => dispatch(confirmAction())}>Xác nhận</Button>
                        </div>

                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}
