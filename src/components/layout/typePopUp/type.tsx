export interface PopUpItem {
    id: string;   
    title: string;         
    content: React.ReactNode;
}

export interface PopUpData {
    title: string;
    description: string;
    items: PopUpItem[];
}
