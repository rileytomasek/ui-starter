import { dateFromValue } from "@/lib/date-only"
import { z } from "zod"
export const owners = [
  { value: "maya", label: "Maya Chen" },
  { value: "alex", label: "Alex Morgan" },
  { value: "sam", label: "Sam Rivera" },
]
export const topics = [
  { value: "research", label: "Research" },
  { value: "design", label: "Design systems" },
  { value: "delivery", label: "Delivery" },
]
export const schema = z.object({
  name: z.string().trim().min(3, "Enter at least 3 characters."),
  description: z.string().max(600, "Keep the description under 600 characters."),
  email: z.email("Enter a valid email address."),
  owner: z.string().min(1, "Choose an owner."),
  topics: z.array(z.string()),
  reviewDate: z.string().refine((v) => !v || !!dateFromValue(v), "Choose a valid calendar date."),
  priority: z.string(),
  digest: z.boolean(),
})
export type ProjectValues = z.infer<typeof schema>
export const initialProject: ProjectValues = {
  name: "Interface research",
  description: "Understand how teams organize and review their work.",
  email: "research@example.com",
  owner: "maya",
  topics: ["research"],
  reviewDate: "2026-11-12",
  priority: "normal",
  digest: true,
}
