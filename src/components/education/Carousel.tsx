import {
  Coins,
  CircleDollarSignIcon,
  Leaf,
  Wallet,
  Factory,
  Scale,
  Bus,
  GraduationCap,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

const slides = [
  {
    children: <Coins size={40} color="#777777" />,
    text: "Wprowadzenie podatków od emisji CO2 dla firm i sektorów gospodarki, aby zachęcać do ograniczenia emisji.",
  },
  {
    children: <CircleDollarSignIcon size={40} color="#777777" />,
    text: "Zachęty finansowe dla firm i osób prywatnych, które angażują się w działania proekologiczne, a także opodatkowanie emisji zanieczyszczeń.",
  },
  {
    children: <Leaf size={40} color="#777777" />,
    text: "Zapewnienie prawa publicznego dostępu do aktualnych danych dotyczących jakości powietrza, aby obywatele byli świadomi obecnej sytuacji.",
  },
  {
    children: <Wallet size={40} color="#777777" />,
    text: "Wprowadzenie programów rządowych oferujących dotacje i kredyty na termomodernizację budynków, wspierające poprawę izolacji i efektywności energetycznej.",
  },
  {
    children: <Factory size={40} color="#777777" />,
    text: "Przejście na odnawialne źródła energii, takie jak energia słoneczna, wiatrowa i hybrydowa, aby zastąpić tradycyjne źródła, które często przyczyniają się do emisji zanieczyszczeń.",
  },
  {
    children: <Scale size={40} color="#777777" />,
    text: "Ustanowienie i egzekwowanie surowych norm dotyczących emisji przemysłowych i pojazdów, a także regularne kontrole w celu monitorowania przestrzegania tych norm.",
  },
  {
    children: <Bus size={40} color="#777777" />,
    text: "Rozwój efektywnych i ekologicznych systemów transportu publicznego, promowanie ruchu zbiorowego, a także popieranie i rozwijanie infrastruktury dla pieszych i rowerzystów.",
  },
  {
    children: <GraduationCap size={40} color="#777777" />,
    text: "Kampanie edukacyjne na temat skutków smogu dla zdrowia oraz działań, które mogą być podjęte, aby go ograniczyć. Włączenie informacji o jakości powietrza w programy edukacyjne szkół.",
  },
];

const Slide = ({ children, text }: (typeof slides)[number]) => {
  return (
    <div className="flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4 keen-slider__slide">
      {children}
      <p className="text-base font-[400] text-white">{text}</p>
    </div>
  );
};

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, instance] = useKeenSlider({
    slides: { perView: 1, spacing: 16 },
    mode: "free-snap",
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });
  return (
    <div className="my-20">
      <div className="flex">
        <h2 className="text-2xl font-[500] text-white">Działania prewencyjne w Polsce</h2>
        <span className="ml-[12px]">
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_219_733)">
              <mask
                id="mask0_219_733"
                style={{
                  maskType: "luminance",
                }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="28"
                height="29">
                <path d="M28 0.361816H0V28.3618H28V0.361816Z" fill="white" />
              </mask>
              <g mask="url(#mask0_219_733)">
                <path
                  d="M14 28.3618C21.732 28.3618 28 22.0938 28 14.3618C28 6.62983 21.732 0.361816 14 0.361816C6.26801 0.361816 0 6.62983 0 14.3618C0 22.0938 6.26801 28.3618 14 28.3618Z"
                  fill="#F0F0F0"
                />
                <path
                  d="M28 14.3618C28 22.0938 21.7319 28.3618 14 28.3618C6.26806 28.3618 0 22.0938 0 14.3618"
                  fill="#D80027"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_219_733">
                <rect width="28" height="28" fill="white" transform="translate(0 0.361816)" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
      <div className="mt-8">
        <div ref={ref} className="keen-slider">
          {slides.map((slide, idx) => (
            <Slide key={idx} {...slide} />
          ))}
        </div>
        <div className="mt-[32px] flex items-center justify-center">
          {slides.map((_, idx) => {
            return (
              <div
                key={idx}
                onClick={() =>
                  instance.current?.moveToIdx(idx, undefined, {
                    duration: 500,
                  })
                }
                className={`w-[8px] h-[8px] rounded-full mx-2 cursor-pointer transition-all ${
                  idx === currentSlide ? "bg-white scale-[1.15]" : "bg-[#777777] scale-[1]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
