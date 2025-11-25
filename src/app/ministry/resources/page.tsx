import { modernizFont } from '@/lib/utils';

export default function MinistryResources() {
    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
            <h1 className={`text-4xl font-bold text-white ${modernizFont.className}`}>Resources</h1>
        </div>
    );
}

