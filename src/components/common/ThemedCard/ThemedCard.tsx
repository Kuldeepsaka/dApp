import { Card } from 'react-bootstrap';
import './ThemedCard.scss';
import type { ReactNode } from 'react';

interface ThemedCardProps {
    title: string;
    text?: string;
    children?: ReactNode; // ✅ Make children optional
}

export default function ThemedCard({ title, text, children }: ThemedCardProps) {
    return (
        <Card className="themed-card shadow-sm h-100">
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {text && <Card.Text>{text}</Card.Text>}
                {children}
            </Card.Body>
        </Card>
    );
}
