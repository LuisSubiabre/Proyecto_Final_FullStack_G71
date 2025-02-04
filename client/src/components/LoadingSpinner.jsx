import { Spinner } from "@nextui-org/react"; // Usamos Spinner en lugar de Loading

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
    </div>
);

export default LoadingSpinner;
