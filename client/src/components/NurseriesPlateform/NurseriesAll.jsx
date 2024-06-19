/* eslint-disable no-unused-vars */
import { useState } from "react";
import NurseriesMini from "./NurseriesMini";
import NurseriesMap from "./NuseriesMap";
import "./nurseriesAll.css";

function NurseriesAll() {
  const [viewList, setViewList] = useState(true);
  const [viewMap, setViewMap] = useState(false);

  const handleViewList = () => {
    setViewList(true);
    setViewMap(false);
  };

  const handleViewMap = () => {
    setViewMap(true);
    setViewList(false);
  };

  const lilleNurseries = [
    {
      name: "Lillomomes",
      address: "27 rue Courmont",
      map: [50.619581, 3.06647],
      phone: "03 20 85 96 41",
      capacity: 37,
      prices: 10,
      mail: "contact@lillomomes.fr",
      password: "",
      image1:
        "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_4032,h_3024/https://www.lillomomes.fr/wp-content/uploads/2021/09/A6240589-7B2D-43C7-B98C-E9E76F3DCAFB.png",
      image2:
        "https://www.lillomomes.fr/wp-content/uploads/2019/08/0I9A8517.jpg",
      image3:
        "https://www.lillomomes.fr/wp-content/uploads/2019/08/0I9A8558.jpg",
    },
    {
      name: "Les Minilions",
      address: "53 Rue Saint-Sébastien",
      map: [50.646742, 3.057051],
      phone: "03 20 85 96 41",
      capacity: 10,
      prices: 15,
      mail: " contact@minilions.fr",
      password: "",
      image1:
        "https://minilions.fr/wp-content/uploads/2017/06/Lille_EspaceActivite2-1128x536.jpg",
      image2:
        "https://minilions.fr/wp-content/uploads/2017/06/Lille_espaceActivite-1128x536.jpg",
      image3:
        "https://minilions.fr/wp-content/uploads/2016/12/Minilions-Le-Concept.jpg",
    },
    {
      name: "Tambourin et Castagnettes - Liberté",
      address: "5 rue d'Hazebrouck",
      map: [50.629234, 3.067068],
      phone: "03 20 75 92 76",
      capacity: 10,
      prices: 15,
      mail: "hello@tambourin-et-castagnettes.com",
      password: "",
      image1:
        "https://i0.wp.com/tambourin-et-castagnettes.com/wp-content/uploads/2023/06/creche-lille-liberte-tambourin-et-castagnettes.png?w=838&ssl=1",
      image2:
        "https://i0.wp.com/tambourin-et-castagnettes.com/wp-content/uploads/2023/06/lille-liberte-tambourin-et-castagnettes.png?w=779&ssl=1",
      image3:
        "https://i0.wp.com/tambourin-et-castagnettes.com/wp-content/uploads/2023/06/lille-liberte-tambourin-et-castagnettes.png?fit=779%2C520&ssl=1",
    },
    {
      name: "Chlorophylle",
      address: "6 rue Fourrier",
      map: [50.634505, 3.019329],
      phone: "06 51 99 48 67",
      capacity: 12,
      prices: 10,
      mail: "hello@chlorophylle.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/209330/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-chlorophylle-5@2x.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/150000/155528/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-chlorophylle-1.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/150000/155527/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-chlorophylle-2.png",
    },
    {
      name: "Le Royaume des Petits Lutins",
      address: "46 rue Pierre Curie",
      map: [50.646742, 3.057051],
      phone: "09 50 09 81 14",
      capacity: 12,
      prices: 10,
      mail: "hello@chlorophylle.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/10000/10435/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-le-royaume-des-petits-lutins-4.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/205111/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-le-royaume-des-petits-lutins-2.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/205112/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-le-royaume-des-petits-lutins-3.png",
    },
    {
      name: "Harmonie",
      address: "56 rue des Eaux",
      map: [50.656532, 3.086125],
      phone: "03 28 14 44 56",
      capacity: 12,
      prices: 10,
      mail: "hello@harmonie.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/202173/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-1.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/210000/211815/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-2.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/209332/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-3.png",
    },
    {
      name: "Tilleul",
      address: "19 Square Dutilleul",
      map: [50.636741, 3.054759],
      phone: "07 82 27 21 40",
      capacity: 15,
      prices: 10,
      mail: "hello@tilleul.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/100000/107332/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-tilleul-2.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/100000/107334/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-tilleul-1.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/100000/107340/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-tilleul-3.png",
    },
    {
      name: "Les petits soleils",
      address: "10 rue des Cannoniers",
      map: [50.639378, 3.069895],
      phone: "09 50 15 28 89",
      capacity: 13,
      prices: 10,
      mail: "hello@petitssoleils.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/140000/144752/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-lumiere-3.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/140000/144754/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-lumiere-5.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/140000/144753/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-lumiere-4.png",
    },
    {
      name: "Babilou Lille Le Plat",
      address: "33 rue du Plat",
      map: [50.656532, 3.086125],
      phone: "03 28 14 44 56",
      capacity: 12,
      prices: 10,
      mail: "hello@harmonie.com",
      password: "",
      image1:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/202173/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-1.png",
      image2:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/210000/211815/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-2.png",
      image3:
        "https://www.people-and-baby.com/website/var/tmp/image-thumbnails/200000/209332/thumb__auto_9ec5e916d6131b83ab964a13cda144c6/peopleandbaby-creche-lille-harmonie-3.png",
    },
  ];
  return (
    <>
      <h2 className="nurseries_all_city_title">Lille</h2>
      <div className="mobile_nurseries_all">
        <div className="nurseries_all_buttons_container">
          <button
            type="button"
            className="nurseries_all_button"
            onClick={handleViewList}
          >
            Liste
          </button>
          <button
            className="nurseries_all_button"
            type="button"
            onClick={handleViewMap}
          >
            Carte
          </button>
        </div>
        {viewList ? (
          <>
            <div className="line_list_section"> </div>
            <div className="nurseries_all_list_section">
              {lilleNurseries.map((nursery) => (
                <NurseriesMini
                  key={nursery.id}
                  name={nursery.name}
                  prices={nursery.prices}
                  address={nursery.address}
                  image1={nursery.image1}
                  image2={nursery.image2}
                  image3={nursery.image3}
                />
              ))}
            </div>
          </>
        ) : (
          <NurseriesMap
            lilleNurseries={lilleNurseries}
            handleViewList={handleViewList}
          />
        )}
      </div>
      <div className="desktop_nurseries_all">
        <div className="nurseries_all_list_section">
          <div className="nurseries_all_list_desktop">
            {lilleNurseries.map((nursery) => (
              <NurseriesMini
                key={nursery.id}
                name={nursery.name}
                prices={nursery.prices}
                address={nursery.address}
                image1={nursery.image1}
                image2={nursery.image2}
                image3={nursery.image3}
              />
            ))}
          </div>
          <div className="nurseries_all_map_desktop">
            <NurseriesMap
              lilleNurseries={lilleNurseries}
              handleViewList={handleViewList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NurseriesAll;
