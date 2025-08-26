import { SalesFunnel } from '../../types/ad-campaigns';
interface SalesFunnelBuilderProps {
    funnelId?: string;
    onSave?: (funnel: SalesFunnel) => void;
    className?: string;
}
export default function SalesFunnelBuilder({ funnelId, onSave, className }: SalesFunnelBuilderProps): any;
export {};
