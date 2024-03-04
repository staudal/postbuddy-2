import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const segmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  targeting: z.string(),
});

export type Segment = z.infer<typeof segmentSchema>;
