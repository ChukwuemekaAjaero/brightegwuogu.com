import { modernizFont } from '@/lib/utils';

export default function MusicContact() {
    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
            <h1 className={`text-4xl font-bold text-white ${modernizFont.className}`}>Contact</h1>
        </div>
    );
}

