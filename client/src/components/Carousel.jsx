import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Icon from "./Icons.jsx";

const Carrusel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div className="relative overflow-hidden w-full h-[150px] md:h-[250px] lg:h-[350px] xl:h-[400px]">
            <div className="overflow-hidden w-full h-full" ref={emblaRef}>
                <div className="flex">
                    {/* Slide 1 */}
                    <div className="flex-[0_0_100%] h-[150px] md:h-[250px] lg:h-[350px] xl:h-[400px]">
                        <img
                            src="https://res.cloudinary.com/dxxrdckad/image/upload/v1736905877/gif_alas_alondra_rwaqe5.gif"
                            alt="regreso a clases con papeleria alas de alondra"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Slide 2 */}
                    <div className="flex-[0_0_100%] h-[150px] md:h-[250px] lg:h-[350px] xl:h-[400px]">
                        <img
                            src="https://res.cloudinary.com/dxxrdckad/image/upload/v1729711111/banner_artel_ma4ndx.webp"
                            alt="Productos artel"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Slide 3 */}
                    <div className="flex-[0_0_100%] h-[150px] md:h-[250px] lg:h-[350px] xl:h-[400px]">
                        <img
                            src="https://res.cloudinary.com/dxxrdckad/image/upload/v1729714379/Slider_STABILO_BOSS_23er_deskset_1860x750_ahm7t6.jpg"
                            alt="destacadores"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            {/* Botón para retroceder */}
            <button
                onClick={scrollPrev}
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full ${
                    !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <Icon name="arrowLeft" className="w-5 h-5" />
            </button>
            {/* Botón para avanzar */}
            <button
                onClick={scrollNext}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full ${
                    !canScrollNext ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <Icon name="arrowRight" className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Carrusel;
