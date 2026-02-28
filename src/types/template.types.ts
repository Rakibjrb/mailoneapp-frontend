export type TemplateData = {
    _id?: string;
    name: string;
    subject: string;
    html: string;
    plainText: string;
    variables: string[];
    isDefault?: string;
    createdAt?: string;
    updatedAt?: string;
}