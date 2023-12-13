import Link from "next/link";
import { api } from "~/trpc/server";
import Image from "next/image";
import { Building } from "@prisma/client";
import { RouterOutputs } from "~/trpc/shared";

interface CreateButtonProps {
  openModal: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ openModal }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={openModal}
        className="flex rounded bg-slate-300 px-4 py-2 font-bold text-black hover:bg-slate-400"
      >
        Add lease
      </button>
    </div>
  );
};
