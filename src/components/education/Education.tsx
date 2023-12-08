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
          "absolute top-full w-full duration-700 transition-all z-50",
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
                    width="47"
                    height="46"
                    viewBox="0 0 48 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.45208 28.0512H2.05671C2.34851 28.0512 2.50875 27.8746 2.58184 27.6975L3.10697 26.5185H7.07524L7.60037 27.6829C7.73194 27.9629 7.84832 28.0512 8.11089 28.0512H9.73013C9.94884 28.0512 10.0658 27.8595 9.97808 27.6683L5.41158 17.751C5.36773 17.6628 5.2654 17.5891 5.16364 17.5891H5.01745C4.91512 17.5891 4.81336 17.6628 4.76951 17.751L0.203009 27.6683C0.116425 27.8595 0.23337 28.0512 0.45208 28.0512ZM3.98294 24.5147L5.07705 22.0831H5.09167L6.2004 24.5147H3.98294Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M11.5957 27.7719C11.5957 27.9192 11.7127 28.0519 11.8729 28.0519H17.913C18.0732 28.0519 18.1902 27.9192 18.1902 27.7719V26.1656C18.1902 26.0183 18.0732 25.8856 17.913 25.8856H13.8716V23.8964H17.1978C17.3435 23.8964 17.475 23.7784 17.475 23.6164V22.0101C17.475 21.8628 17.3435 21.7301 17.1978 21.7301H13.8716V19.9029H17.913C18.0732 19.9029 18.1902 19.7702 18.1902 19.6229V18.0166C18.1902 17.8693 18.0732 17.7366 17.913 17.7366H11.8729C11.7127 17.7366 11.5957 17.8693 11.5957 18.0166V27.7719Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M20.0558 27.6392C19.9243 27.8309 20.0558 28.0519 20.3038 28.0519H22.3318C22.4487 28.0519 22.5358 27.9782 22.5797 27.9192L24.4469 24.9427H24.4761L26.3872 27.9192C26.431 27.9929 26.548 28.0519 26.6351 28.0519H28.6631C28.8964 28.0519 29.028 27.8456 28.8964 27.6392L25.8328 22.7618L28.7947 18.1493C28.9262 17.9575 28.7947 17.7366 28.5467 17.7366H26.4164C26.3141 17.7366 26.2123 17.8102 26.1831 17.8693L24.4767 20.6102H24.4621L22.7844 17.8693C22.7405 17.8102 22.6534 17.7366 22.551 17.7366H20.4207C20.1728 17.7366 20.0558 17.9575 20.1728 18.1493L23.12 22.7618L20.0558 27.6392Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M29.6338 22.909C29.6338 25.8562 31.9536 28.199 34.8716 28.199C37.7896 28.199 40.124 25.8562 40.124 22.909C40.124 19.9617 37.7896 17.5891 34.8716 17.5891C31.9536 17.5891 29.6338 19.9617 29.6338 22.909ZM31.9682 22.909C31.9682 21.2881 33.281 19.9471 34.8716 19.9471C36.4762 19.9471 37.7896 21.2881 37.7896 22.909C37.7896 24.5153 36.4768 25.8416 34.8716 25.8416C33.281 25.8416 31.9682 24.5153 31.9682 22.909Z"
                      fill="#F5F5F7"
                    />
                    <path
                      d="M41.8896 27.7719C41.8896 27.9192 42.0066 28.0519 42.1668 28.0519H47.6526C47.8128 28.0519 47.9298 27.9192 47.9298 27.7719V26.1656C47.9298 26.0183 47.8128 25.8856 47.6526 25.8856H44.1802V18.0166C44.1802 17.8693 44.0486 17.7366 43.903 17.7366H42.1668C42.006 17.7366 41.8896 17.8693 41.8896 18.0166V27.7719Z"
                      fill="#F5F5F7"
                    />
                    <path d="M47.5117 29.8306H45.8794V37.1759H47.5117V29.8306Z" fill="#F5F5F7" />
                    <path
                      d="M23.0269 37.9922V46.1537H31.1884V37.9922H23.0269ZM29.5561 44.5214H24.6592V39.6245H29.5561V44.5214Z"
                      fill="#F5F5F7"
                    />
                    <path d="M20.5792 0.450195H11.6016V9.42782H20.5792V0.450195Z" fill="#F5F5F7" />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-col gap-10 text-white">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-[600]">Zobacz czym oddychasz. Zmień to!</h2>
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
