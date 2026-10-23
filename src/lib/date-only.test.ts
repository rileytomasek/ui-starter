import { expect, test } from "vitest"
import { dateFromValue, dateToValue } from "./date-only"
test("strict calendar dates reject rollover and round trip without UTC conversion", () => {
  for (const value of ["2026-02-29", "2026-13-01", "2026-04-31", "2026-1-01", "invalid"])
    expect(dateFromValue(value)).toBeUndefined()
  for (const value of ["2024-02-29", "2026-03-08", "2026-11-01", "0099-01-01"])
    expect(dateToValue(dateFromValue(value) ?? new Date(NaN))).toBe(value)
})
