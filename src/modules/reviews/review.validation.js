import Z from "zod";

const baseReviewSchema = {
    rating:Z.number().min(1).max(5),
    comment:Z.string().optional()
}

const addReviewSchema = Z.object(baseReviewSchema)