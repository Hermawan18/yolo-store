import Image from 'next/image';

export default function Banner() {
  const bannerImg = [
    'https://im.uniqlo.com/global-cms/spa/res45c486b6c117eafc442ac32089daf45bfr.jpg',
    'https://im.uniqlo.com/global-cms/spa/res3ccdab92f9225ce787f6f2f92750d690fr.jpg',
    'https://im.uniqlo.com/global-cms/spa/res77b233d8d2d552749faed06e4b0ffab9fr.jpg',
    'https://im.uniqlo.com/global-cms/spa/res71523346b1a5cadd422d8fe5448cd5b8fr.jpg',
  ];
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <Image src={bannerImg[0]} width={1800} height={500} alt="banner1" priority />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image src={bannerImg[1]} width={1800} height={500} alt="banner2" priority />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image src={bannerImg[2]} width={1800} height={500} alt="banner3" priority />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Image src={bannerImg[3]} width={1800} height={500} alt="banner4" priority />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
