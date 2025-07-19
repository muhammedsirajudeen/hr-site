import mongoose, { Schema, Document, model } from 'mongoose';

export interface SocialLink {
    platform: string;
    link: string;
}

export interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary?: number;
    description: string;
    requirements: string[];
    isRemote: boolean;
    postedAt: Date;
    socialLinks?: SocialLink[]; // Added optional socialLinks field
}

export interface JobDocument extends Omit<Job,"_id">, Document { }

const SocialLinkSchema: Schema<SocialLink> = new Schema<SocialLink>(
    {
        platform: { type: String, required: true },
        link: { type: String, required: true },
    },
    { _id: false } // Prevents generating _id for each subdocument
);

const JobSchema: Schema = new Schema<JobDocument>({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    isRemote: { type: Boolean, default: false },
    postedAt: { type: Date, default: Date.now },
    socialLinks: { type: [SocialLinkSchema], default: [] }, // Added socialLinks
});

export const JobModel = mongoose.models.Job || model<JobDocument>('Job', JobSchema);
