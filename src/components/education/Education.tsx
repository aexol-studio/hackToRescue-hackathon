"use client";
import { cx } from "@/utils";
import { Bus, Leaf, X } from "lucide-react";
import React, { useEffect } from "react";
import { useAppStore } from "@/stores";
import {
  CheckCircle,
  Phone,
  CircleDollarSignIcon,
  Coins,
  Factory,
  Wallet,
  Scale,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "./Carousel";

export const Education = () => {
  const { setEducationOpen, educationOpen } = useAppStore(state => ({
    educationOpen: state.educationOpen,
    setEducationOpen: state.setEducationOpen,
  }));
  const ref = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setEducationOpen(false);
      }
    };
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        setEducationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const [scrolledDown, setScrolledDown] = React.useState(false);

  return (
    <>
      <div
        ref={ref}
        className={cx(
          scrolledDown ? "h-screen" : "h-3/4",
          "absolute top-full w-full duration-700 transition-all z-[2137]",
          educationOpen && "-translate-y-full"
        )}>
        <div className="w-full h-full overflow-hidden">
          <div
            onScroll={e => {
              if ((e.target as HTMLDivElement).scrollTop > 100) {
                setScrolledDown(true);
              }
            }}
            className="px:8 relative w-full h-full bg-[#141618] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#575552] border-b-none overflow-y-auto">
            <X
              color="white"
              onClick={() => {
                setEducationOpen(false);
                setScrolledDown(false);
              }}
              className="absolute right-5 top-5 cursor-pointer text-dark-500"
            />
            <div className="px-4 py-10 lg:py-32 md:px-28 max-w-[1600px]">
              <div className="flex flex-col gap-8 text-white">
                <h2 className="text-3xl font-[500]">Ogólne zalecenia</h2>
                <div className="flex flex-col gap-6">
                  <div className="grid lg:flex gap-[10px]">
                    <span className="min-w-[24px] min-h-[24px]">
                      <CheckCircle />
                    </span>
                    <p className="text-base text-[#F7F7F7] font-[400]">
                      Regularnie sprawdzaj prognozy jakości powietrza dostępne w lokalnych źródłach
                      lub aplikacjach.
                    </p>
                  </div>
                  <div className="grid lg:flex gap-[10px]">
                    <span className="min-w-[24px] min-h-[24px]">
                      <CheckCircle />
                    </span>
                    <p className="text-base text-[#F7F7F7] font-[400]">
                      Zapoznaj się ze skalą AQI (Air Quality Index) i śledzić poziom zanieczyszczeń.
                    </p>
                  </div>
                  <div className="grid lg:flex gap-[10px]">
                    <span className="min-w-[24px] min-h-[24px]">
                      <CheckCircle />
                    </span>
                    <p className="text-base text-[#F7F7F7] font-[400] max-w-[700px]">
                      W dni o zwiększonej koncentracji smogu, zwłaszcza o wysokim stopniu
                      zanieczyszczenia, ogranicz aktywności na zewnątrz, zwłaszcza intensywne
                      ćwiczenia fizyczne.
                    </p>
                  </div>
                  <div className="grid lg:flex gap-[10px]">
                    <span className="min-w-[24px] min-h-[24px]">
                      <CheckCircle />
                    </span>
                    <p className="text-base text-[#F7F7F7] font-[400] max-w-[700px]">
                      Osoby cierpiące na przewlekłe choroby układu oddechowego, serca, starsze osoby
                      i dzieci są bardziej podatne na negatywne skutki smogu. Powinny zachować
                      szczególną ostrożność i dostosować swoje codzienne aktywności.
                    </p>
                  </div>
                </div>
              </div>
              <section className="block lg:hidden">
                <Carousel />
              </section>

              <section className="hidden lg:max-w-[1600px] w-full lg:flex justify-center items-center my-24">
                <div className="grid lg:flex w-full gap-4  items-center">
                  <div className="flex flex-col gap-4">
                    <div className="gap-1 lg:gap-0 w-full max-w-[160px] h-[160px] p-4 font-jost font-medium text-xl lg:text-4xl text-white flex items-end">
                      <h2 className="text-xl lg:text-2xl">Działania prewencyjne w Polsce</h2>
                      <span className="lg:ml-[-24px]">
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
                              <rect
                                width="28"
                                height="28"
                                fill="white"
                                transform="translate(0 0.361816)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <div className="hidden max-w-[240px] lg:flex lg:flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                      <Coins size={40} color="#777777" />
                      <p className="text-base font-[400] text-white">
                        Wprowadzenie podatków od emisji CO2 dla firm i sektorów gospodarki, aby
                        zachęcać do ograniczenia emisji.
                      </p>
                    </div>
                    <div className="max-w-[240px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                      <CircleDollarSignIcon size={40} color="#777777" />
                      <p className="text-base font-[400] text-white">
                        Zachęty finansowowe dla firm i osób prywatnych, które angażują się w
                        działania proekologiczne, a także opodatkowanie emisji zanieczyszczeń.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <Leaf size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Zapewnienie prawa publicznego dostępu do aktualnych danych dotyczących
                          jakości powietrza, aby obywatele byli świadomi obecnej sytuacji.
                        </p>
                      </div>
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <Wallet size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Wprowadzenie programów rządowych oferujących dotacje i kredyty na
                          termomodernizację budynków, wspierające poprawę izolacji i efektywności
                          energetycznej.
                        </p>
                      </div>
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <Factory size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Przejście na odnawialne źródła energii, takie jak energia słoneczna,
                          wiatrowa i hybrydowa, aby zastąpić tradycyjne źródła, które często
                          przyczyniają się do emisji zanieczyszczeń.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <Scale size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Ustanowienie i egzekwowanie surowych norm dotyczących emisji przemysłowych
                          i pojazdów, a także regularne kontrole w celu monitorowania przestrzegania
                          tych norm.
                        </p>
                      </div>
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <Bus size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Rozwój efektywnych i ekologicznych systemów transportu publicznego,
                          promowanie ruchu zbiorowego, a także popieranie i rozwijanie
                          infrastruktury dla pieszych i rowerzystów.
                        </p>
                      </div>
                      <div className="max-w-[346px] flex flex-col gap-4 bg-[#303133] rounded-[24px] p-4">
                        <GraduationCap size={40} color="#777777" />
                        <p className="text-base font-[400] text-white">
                          Kampanie edukacyjne na temat skutków smogu dla zdrowia oraz działań, które
                          mogą być podjęte, aby go ograniczyć. Włączenie informacji o jakości
                          powietrza w programy edukacyjne szkół.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="grid lg:flex flex-col my-10 lg:my-0">
                <div className="max-w-[800px]">
                  <h2 className="text-xl lg:text-3xl font-[500] text-white">
                    Program Priorytetowy „Czyste Powietrze”
                  </h2>
                  <p className="mt-4 text-white font-[400] text-base lg:text-lg">
                    Celem programu jest poprawa jakości powietrza oraz zmniejszenie emisji gazów
                    cieplarnianych poprzez wymianę źródeł ciepła i poprawę efektywności
                    energetycznej budynków mieszkalnych jednorodzinnych. Sprawdź czy możesz
                    skorzystać z dotacji.
                  </p>
                </div>
                <Link
                  className="w-fit mt-[64px] lg:mt-12 px-6 py-3 bg-white text-[#303133] rounded-[40px] text-sm font-[500]"
                  href={"https://czystepowietrze.gov.pl/czyste-powietrze/"}>
                  Dowiedz się więcej
                </Link>
              </div>
            </div>
            <footer className="grid lg:flex justify-between w-full bg-black gap-10 lg:gap-0 pt-10 pb-16 lg:py-20 px-4 lg:px-32">
              <div className="grid lg:flex gap-6">
                <div className="relative w-[200px] h-[46px]">
                  <Link href="https://hacktotherescue.org/">
                    <Image src="/hack_the_rescue_logo.png" fill alt="hack the rescue logo" />
                  </Link>
                </div>
                <div className="relative w-[112px] h-[46px]">
                  <Link href="https://polskialarmsmogowy.pl/">
                    <Image src="/polski_alarm_smogowy.png" fill alt="polski alarm smogowy logo" />
                  </Link>
                </div>
                <Link className="w-[47px] h-[46px]" href="https://aexol.com/">
                  <svg
                    width="82"
                    height="19"
                    viewBox="0 0 82 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.08939 18.1108H3.81166C4.30671 18.1108 4.57856 17.8112 4.70256 17.5108L5.59344 15.5106H12.3257L13.2166 17.486C13.4398 17.961 13.6372 18.1108 14.0827 18.1108H16.8297C17.2008 18.1108 17.3992 17.7855 17.2504 17.4612L9.50325 0.636521C9.42885 0.486769 9.25525 0.361816 9.08261 0.361816H8.8346C8.661 0.361816 8.48836 0.486769 8.41396 0.636521L0.666842 17.4612C0.51995 17.7855 0.718349 18.1108 1.08939 18.1108ZM7.07953 12.1111L8.93571 7.98581H8.96051L10.8415 12.1111H7.07953Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M19.9971 17.6375C19.9971 17.8874 20.1955 18.1125 20.4673 18.1125H30.7145C30.9863 18.1125 31.1847 17.8874 31.1847 17.6375V14.9124C31.1847 14.6625 30.9863 14.4374 30.7145 14.4374H23.8582V11.0627H29.5012C29.7482 11.0627 29.9714 10.8624 29.9714 10.5877V7.86264C29.9714 7.61273 29.7482 7.38763 29.5012 7.38763H23.8582V4.28767H30.7145C30.9863 4.28767 31.1847 4.06256 31.1847 3.81266V1.08756C31.1847 0.837652 30.9863 0.612549 30.7145 0.612549H20.4673C20.1955 0.612549 19.9971 0.837652 19.9971 1.08756V17.6375Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M34.3488 17.4124C34.1256 17.7377 34.3488 18.1125 34.7694 18.1125H38.21C38.4084 18.1125 38.5562 17.9876 38.6306 17.8874L41.7983 12.8378H41.8479L45.09 17.8874C45.1644 18.0124 45.3628 18.1125 45.5107 18.1125H48.9512C49.347 18.1125 49.5702 17.7625 49.347 17.4124L44.1496 9.13791L49.1744 1.31267C49.3976 0.987408 49.1744 0.612549 48.7538 0.612549H45.1396C44.966 0.612549 44.7934 0.7375 44.7438 0.837652L41.8489 5.48759H41.8241L38.9778 0.837652C38.9034 0.7375 38.7556 0.612549 38.582 0.612549H34.9679C34.5472 0.612549 34.3488 0.987408 34.5472 1.31267L39.5473 9.13791L34.3488 17.4124Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M50.5967 9.38723C50.5967 14.3872 54.5322 18.3619 59.4827 18.3619C64.4331 18.3619 68.3935 14.3872 68.3935 9.38723C68.3935 4.38724 64.4331 0.362061 59.4827 0.362061C54.5322 0.362061 50.5967 4.38724 50.5967 9.38723ZM54.557 9.38723C54.557 6.63733 56.7843 4.36244 59.4827 4.36244C62.205 4.36244 64.4331 6.63733 64.4331 9.38723C64.4331 12.1123 62.2059 14.3624 59.4827 14.3624C56.7843 14.3624 54.557 12.1123 54.557 9.38723Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M71.3896 17.6375C71.3896 17.8874 71.588 18.1125 71.8599 18.1125H81.1665C81.4384 18.1125 81.6368 17.8874 81.6368 17.6375V14.9124C81.6368 14.6625 81.4384 14.4374 81.1665 14.4374H75.2756V1.08756C75.2756 0.837652 75.0524 0.612549 74.8054 0.612549H71.8599C71.5871 0.612549 71.3896 0.837652 71.3896 1.08756V17.6375Z"
                      fill="#F5F5F7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-col gap-10 text-white">
                <div className="flex flex-col gap-1">
                  <Link
                    href="https://zobaczczymoddychasz.pl/"
                    className="text-2xl font-[600] no-underline text-white">
                    Zobacz czym oddychasz. Zmień to!
                  </Link>
                  <p className="text-base font-[300]">Wymień piec. Namów sąsiada! Weź dotację!</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-[400]">Skontaktuj się z nami</p>
                  <div className="flex gap-2 items-center">
                    <span>
                      <Phone />
                    </span>
                    <p className="text-lg font-[600]">(22) 340 40 80</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
