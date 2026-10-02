import { create } from "zustand";
import type { Offering } from "@/lib/site-data";

type EnquireState = {
  open: boolean;
  offering: Offering;
  job: string;
  openEnquire: (opts?: { offering?: Offering; job?: string }) => void;
  closeEnquire: () => void;
  setOffering: (offering: Offering) => void;
  setJob: (job: string) => void;
};

export const useEnquire = create<EnquireState>((set) => ({
  open: false,
  offering: "unsure",
  job: "",
  openEnquire: (opts) =>
    set((s) => ({
      open: true,
      offering: opts?.offering ?? s.offering,
      job: opts?.job ?? s.job,
    })),
  closeEnquire: () => set({ open: false }),
  setOffering: (offering) => set({ offering }),
  setJob: (job) => set({ job }),
}));
