import { Head } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Users,
    Calendar,
    Star,
    ChefHat,
    Leaf,
    ArrowRight,
    Instagram,
    Facebook,
    Twitter,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
}

const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Wagyu Tataki',
        description: 'Seared Wagyu beef with truffle ponzu, microgreens, and crispy garlic',
        price: '$38',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    },
    {
        id: 2,
        name: 'Fresh Uni Selection',
        description: 'Premium Hokkaido uni served traditional style with pickled ginger',
        price: '$42',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
    },
    {
        id: 3,
        name: 'Chef\'s Omakase',
        description: '12-piece chef\'s selection of seasonal nigiri, prepared tableside',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
    },
    {
        id: 4,
        name: 'Black Cod Saikyo',
        description: 'Miso-marinated black cod with sweet onion puree and seasonal vegetables',
        price: '$48',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    },
    {
        id: 5,
        name: 'A5 Wagyu Ribeye',
        description: 'Grade A5 Kagoshima wagyu with wasabi stem and ponzu',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    },
    {
        id: 6,
        name: 'Golden Lobster',
        description: 'Butter-poached lobster with gold flake, yuzu kosho, and herb oil',
        price: '$75',
        image: 'https://images.unsplash.com/photo-1553247407-23251b9c19e0?w=600&q=80',
    },
];

const galleryImages: GalleryImage[] = [
    { id: 1, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Restaurant interior' },
    { id: 2, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', alt: 'Sushi platter' },
    { id: 3, src: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=600&q=80', alt: 'Chef preparing food' },
    { id: 4, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Gourmet dish' },
    { id: 5, src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80', alt: 'Restaurant ambiance' },
    { id: 6, src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', alt: 'Asian cuisine' },
    { id: 7, src: 'https://images.unsplash.com/photo-1540189549336-e6e2c4a3a234?w=600&q=80', alt: 'Fresh ingredients' },
    { id: 8, src: 'https://images.unsplash.com/photo-1563245372-f21724e3856e?w=600&q=80', alt: 'Elegant plating' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            {children}
        </div>
    );
}

export default function Welcome() {
    const [reservationData, setReservationData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/reservation/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: reservationData.name,
                    email: reservationData.email,
                    phone: reservationData.phone,
                    date: reservationData.date,
                    time: reservationData.time,
                    guests: reservationData.guests,
                    specialRequests: reservationData.specialRequests,
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                setSubmitSuccess(true);
                setReservationData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: '2',
                    specialRequests: '',
                });
            } else {
                alert(data.message || 'Failed to submit reservation. Please try again.');
            }
        } catch (error) {
            console.error('Reservation submission error:', error);
            alert('Failed to submit reservation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Asian Food | Premium Dining Experience">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-[#FAF8F5]">
                {/* Navigation */}
                <nav className="fixed left-0 right-0 top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <span className="font-serif text-2xl font-medium tracking-wide text-[#1A1A1A]">
                            Asian Food
                        </span>
                        <div className="hidden items-center gap-8 md:flex">
                            <button onClick={() => scrollToSection('about')} className="text-sm tracking-wider text-[#5A5A5A] transition-colors hover:text-[#1A1A1A]">
                                About
                            </button>
                            <button onClick={() => scrollToSection('menu')} className="text-sm tracking-wider text-[#5A5A5A] transition-colors hover:text-[#1A1A1A]">
                                Menu
                            </button>
                            <button onClick={() => scrollToSection('gallery')} className="text-sm tracking-wider text-[#5A5A5A] transition-colors hover:text-[#1A1A1A]">
                                Gallery
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="text-sm tracking-wider text-[#5A5A5A] transition-colors hover:text-[#1A1A1A]">
                                Contact
                            </button>
                            <button
                                onClick={() => scrollToSection('reservation')}
                                className="rounded-full border border-[#C9A962] bg-transparent px-6 py-2 text-sm tracking-wider text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-white"
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="hero" className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80"
                            alt="Luxurious Asian restaurant interior"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-[#1A1A1A]/40 to-[#1A1A1A]/70" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center text-center px-6">
                        <FadeIn>
                            <span className="mb-4 text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                Fine Dining Experience
                            </span>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <h1 className="font-serif text-5xl font-medium tracking-wide text-white md:text-7xl lg:text-8xl">
                                Asian Food
                            </h1>
                        </FadeIn>
                        <FadeIn delay={300}>
                            <p className="mt-6 max-w-xl text-lg tracking-wide text-white/80 md:text-xl">
                                Where tradition meets innovation. Experience the art of Asian cuisine
                                crafted with precision and passion.
                            </p>
                        </FadeIn>
                        <FadeIn delay={450}>
                            <button
                                onClick={() => scrollToSection('reservation')}
                                className="mt-10 rounded-none bg-[#C9A962] px-10 py-4 text-sm font-medium tracking-[0.2em] text-white transition-all hover:bg-[#B8943F] hover:shadow-lg"
                            >
                                Reserve a Table
                            </button>
                        </FadeIn>
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <div className="flex flex-col items-center gap-2 text-white/60">
                            <span className="text-xs tracking-widest">Scroll</span>
                            <div className="h-10 w-px bg-white/30" />
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                            <FadeIn>
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
                                        alt="Chef preparing dish"
                                        className="h-[500px] w-full object-cover"
                                    />
                                    <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <span className="block font-serif text-4xl text-[#C9A962]">25+</span>
                                                <span className="text-sm text-[#5A5A5A]">Years Experience</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn delay={200}>
                                <div className="flex flex-col justify-center lg:pl-8">
                                    <span className="text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                        Our Story
                                    </span>
                                    <h2 className="mt-4 font-serif text-4xl font-medium text-[#1A1A1A] md:text-5xl">
                                        A Legacy of Culinary Excellence
                                    </h2>
                                    <p className="mt-6 text-lg leading-relaxed text-[#5A5A5A]">
                                        Founded in 1999, Asian Food has been a beacon of refined Asian cuisine,
                                        where traditional techniques meet contemporary creativity. Our philosophy
                                        centers on three pillars: <span className="text-[#1A1A1A] font-medium">authenticity</span>,{' '}
                                        <span className="text-[#1A1A1A] font-medium">freshness</span>, and{' '}
                                        <span className="text-[#1A1A1A] font-medium">artistry</span>.
                                    </p>
                                    <p className="mt-4 text-lg leading-relaxed text-[#5A5A5A]">
                                        We source our ingredients from the finest farms and fisheries,
                                        ensuring every dish tells a story of quality and dedication.
                                        Each plate is a harmonious balance of flavors, textures, and
                                        aesthetics—designed to awaken your senses.
                                    </p>
                                    <div className="mt-10 flex flex-wrap gap-8">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center border border-[#C9A962]">
                                                <Leaf className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <span className="text-sm text-[#5A5A5A]">Organic Ingredients</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center border border-[#C9A962]">
                                                <ChefHat className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <span className="text-sm text-[#5A5A5A]">Master Chefs</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center border border-[#C9A962]">
                                                <Star className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <span className="text-sm text-[#5A5A5A]">Michelin Excellence</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Menu Highlights Section */}
                <section id="menu" className="bg-[#F5F3EF] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <FadeIn>
                            <div className="text-center">
                                <span className="text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                    Featured Selection
                                </span>
                                <h2 className="mt-4 font-serif text-4xl font-medium text-[#1A1A1A] md:text-5xl">
                                    Menu Highlights
                                </h2>
                                <p className="mx-auto mt-6 max-w-2xl text-lg text-[#5A5A5A]">
                                    A curated selection of our signature dishes, crafted with the finest
                                    ingredients and presented as culinary artwork.
                                </p>
                            </div>
                        </FadeIn>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {menuItems.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 100}>
                                    <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-[#1A1A1A]/0 transition-colors duration-300 group-hover:bg-[#1A1A1A]/20" />
                                        </div>
                                        <div className="mt-5">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-serif text-xl text-[#1A1A1A]">
                                                    {item.name}
                                                </h3>
                                                <span className="font-serif text-lg text-[#C9A962]">
                                                    {item.price}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm leading-relaxed text-[#5A5A5A]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                        <FadeIn delay={400}>
                            <div className="mt-16 text-center">
                                <button className="inline-flex items-center gap-2 border-b border-[#C9A962] pb-1 text-sm tracking-wider text-[#C9A962] transition-colors hover:text-[#1A1A1A] hover:border-[#1A1A1A]">
                                    View Full Menu
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Reservation Section */}
                <section id="reservation" className="py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                            <FadeIn>
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                        Join Us
                                    </span>
                                    <h2 className="mt-4 font-serif text-4xl font-medium text-[#1A1A1A] md:text-5xl">
                                        Reserve Your Experience
                                    </h2>
                                    <p className="mt-6 text-lg text-[#5A5A5A]">
                                        We look forward to welcoming you. For parties of 6 or more,
                                        please call us directly for private dining options.
                                    </p>
                                    <div className="mt-10 flex flex-col gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <Clock className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Hours</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    Tue-Thu: 5:30 PM - 10:00 PM<br />
                                                    Fri-Sat: 5:30 PM - 11:00 PM<br />
                                                    Sun: 5:00 PM - 9:30 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <Users className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Private Events</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    Our private dining room accommodates up to 20 guests.
                                                    Perfect for celebrations and business dinners.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn delay={200}>
                                <div className="bg-white p-8 shadow-xl md:p-12">
                                    {submitSuccess ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A962]/10">
                                                <Star className="h-8 w-8 text-[#C9A962]" />
                                            </div>
                                            <h3 className="mt-6 font-serif text-2xl text-[#1A1A1A]">
                                                Reservation Confirmed
                                            </h3>
                                            <p className="mt-2 text-[#5A5A5A]">
                                                We look forward to welcoming you. A confirmation
                                                email will be sent shortly.
                                            </p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                        Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={reservationData.name}
                                                        onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                                                        className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                        Guests *
                                                    </label>
                                                    <select
                                                        required
                                                        value={reservationData.guests}
                                                        onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                                                        className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                            <option key={num} value={num}>
                                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                        Date *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        required
                                                        value={reservationData.date}
                                                        onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                                                        className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                        Time *
                                                    </label>
                                                    <select
                                                        required
                                                        value={reservationData.time}
                                                        onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                                                        className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                    >
                                                        <option value="">Select time</option>
                                                        <option value="17:30">5:30 PM</option>
                                                        <option value="18:00">6:00 PM</option>
                                                        <option value="18:30">6:30 PM</option>
                                                        <option value="19:00">7:00 PM</option>
                                                        <option value="19:30">7:30 PM</option>
                                                        <option value="20:00">8:00 PM</option>
                                                        <option value="20:30">8:30 PM</option>
                                                        <option value="21:00">9:00 PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={reservationData.email}
                                                    onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                                                    className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={reservationData.phone}
                                                    onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                                                    className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-xs tracking-wider text-[#5A5A5A]">
                                                    Special Requests
                                                </label>
                                                <textarea
                                                    value={reservationData.specialRequests}
                                                    onChange={(e) => setReservationData({ ...reservationData, specialRequests: e.target.value })}
                                                    rows={3}
                                                    className="w-full border-b border-[#E8E4DE] bg-transparent py-3 text-[#1A1A1A] outline-none transition-colors focus:border-[#C9A962]"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="mt-4 rounded-none bg-[#C9A962] py-4 text-sm font-medium tracking-[0.2em] text-white transition-all hover:bg-[#B8943F] disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="bg-[#F5F3EF] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <FadeIn>
                            <div className="text-center">
                                <span className="text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                    Our Space
                                </span>
                                <h2 className="mt-4 font-serif text-4xl font-medium text-[#1A1A1A] md:text-5xl">
                                    Gallery
                                </h2>
                                <p className="mx-auto mt-6 max-w-2xl text-lg text-[#5A5A5A]">
                                    A glimpse into our world—where every detail is crafted to create the
                                    perfect atmosphere for your dining experience.
                                </p>
                            </div>
                        </FadeIn>
                        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                            {galleryImages.map((image, index) => (
                                <FadeIn key={image.id} delay={index * 100}>
                                    <div className="group relative overflow-hidden cursor-pointer">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className={`h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                                                index % 3 === 0 ? 'md:col-span-2' : ''
                                            }`}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/0 transition-colors duration-300 group-hover:bg-[#1A1A1A]/40">
                                            <span className="opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100">
                                                {image.alt}
                                            </span>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact & Location Section */}
                <section id="contact" className="py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                            <FadeIn>
                                <div>
                                    <span className="text-sm tracking-[0.3em] text-[#C9A962] uppercase">
                                        Get in Touch
                                    </span>
                                    <h2 className="mt-4 font-serif text-4xl font-medium text-[#1A1A1A] md:text-5xl">
                                        Contact & Location
                                    </h2>
                                    <div className="mt-10 flex flex-col gap-8">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <MapPin className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Address</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    123 Gourmet Lane<br />
                                                    Midtown District<br />
                                                    New York, NY 10001
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <Phone className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Phone</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    +1 (212) 555-0199<br />
                                                    +1 (212) 555-0100
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <Mail className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Email</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    reservations@asianfood.com<br />
                                                    events@asianfood.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E4DE]">
                                                <Calendar className="h-5 w-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[#1A1A1A]">Reservations</h4>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    Walk-ins welcome based on availability.<br />
                                                    Reservations recommended.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn delay={200}>
                                <div className="relative h-[400px] overflow-hidden bg-[#E8E4DE] md:h-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1524661135-423995f3d0d4?w=800&q=80"
                                        alt="Map location"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/10">
                                        <div className="bg-white p-6 shadow-xl">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-[#C9A962]" />
                                                <span className="text-sm font-medium text-[#1A1A1A]">
                                                    123 Gourmet Lane, New York
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1A1A1A] py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                            <span className="font-serif text-2xl font-medium tracking-wide text-white">
                                Asian Food
                            </span>
                            <div className="flex gap-6">
                                <a href="#" className="text-white/60 transition-colors hover:text-white">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-white/60 transition-colors hover:text-white">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-white/60 transition-colors hover:text-white">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
                            <p className="text-sm text-white/60">
                                &copy; 2024 Asian Food. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

                <style>{`
                    .font-serif {
                        font-family: 'Cormorant Garamond', serif;
                    }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(0.5);
                        cursor: pointer;
                    }
                `}</style>
            </div>
        </>
    );
}