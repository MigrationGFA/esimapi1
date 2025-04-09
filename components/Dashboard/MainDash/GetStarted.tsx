import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface GetStartedProps {
  buttonTextColor: string;
  buttonColor: string;
  text: string;
}

export function GetStarted({
  buttonTextColor,
  buttonColor,
  text,
}: GetStartedProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {text && (
          <button
            className={`px-6 py-2 rounded-full ${buttonColor} ${buttonTextColor} text-sm font-medium transition-transform hover:scale-105`}
          >
            {text}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px] px-12">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Let’s get you started
          </DialogTitle>
        </DialogHeader>

        <div className="flex  items-center ">
          <div>
            <h2 className="text-2xl font-bold  mb-4 pb-2">
              QR Code Installation
            </h2>
            <ol className="l list-decimal px-4">
              <li>Scan the QR code with Camera app</li>
              <li>Follow the prompts on screen to add new Data Plan</li>
            </ol>
          </div>
          <Image
            height={120}
            width={120}
            alt="QR"
            src={`/Dashboard/qr.png`}
            className="ml-auto"
          />
        </div>
        <div></div>
        <div></div>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
