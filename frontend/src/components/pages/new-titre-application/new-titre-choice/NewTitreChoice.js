import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../../../../redux/store';

import { getAllTitres } from '../../../../redux/features/titresCatalog/titresSlice';

import './NewTitreChoice.scss';

import SectionHead from '../../../_cq/section/section-head/SectionHead';
import CqItem from '../../../_cq/cq-item/CqItem';
import { OWNER } from '../../../../dictionnary/common';
import Breadcrumb from '../../../_cq/breadcrumb/Breadcrumb';
import { FONT_COLORS } from '../../../../dictionnary/saas/variables';

const NewTitleChoice = () => {
  const dispatch = useDispatch();
  const allTitres = useSelector((state) => state.titresReducer.allTitres);

  useEffect(() => {
    dispatch(getAllTitres());
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumb />
      <div id="new-title-choice" className="rf-container">
        <div className="rf-grid-row">
          <SectionHead
            subtitle="Demande d'un nouveau titre"
            title="Choix du titre"
            color={FONT_COLORS.MARIANNE_BLUE}
          />
        </div>
        <div className="rf-grid-row">
          <div class="rf-search-bar" id="search-input">
            <label class="rf-label" for="search-input-input">
              Rechercher un titre
            </label>
            <input
              class="rf-input"
              placeholder="Rechercher un titre"
              type="search"
              id="search-input-input"
              name="search-input-input"
            />
            <button class="rf-btn" title="Rechercher">
              <span>Rechercher</span>
            </button>
          </div>
        </div>
        <div className="rf-grid-row rf-grid-row--gutters">
          <div class="rf-col">
            <SectionHead
              subtitle="Suggestions pour exercer des"
              title="Fonctions principales"
              color={FONT_COLORS.G800}
            />
            <CqItem
              owner={OWNER.CATALOG}
              level={''}
              capacite={'Sécurité'}
              itemName={'Certificat de matelot pont'}
              itemId="1"
              itemSlug="certificat-de-matelot-pont"
              details={{
                advancedDescriptions: [
                  {
                    categoryName: 'Fonctions',
                    infos: ["Fonctions d'appui au pont"],
                  },
                  {
                    categoryName: 'Tâches spécialisées',
                    infos: [
                      'Navigation',
                      'Manutention et arrimage de la cargaison',
                      "Contrôle de l'exploitation du navire et assistance aux personnes à bord",
                      'Entretien et réparation',
                    ],
                  },
                ],
                arrete: 'Arrêté du 18 août 2015',
                validityDuration: '5 ans',
              }}
            />
            <CqItem
              owner={OWNER.CATALOG}
              level={''}
              capacite={'Sécurité'}
              itemName={'Certificat de formation de base à la sécurité'}
              itemId="2"
              itemSlug="certificat-de-formation-de-base-a-la-securite"
              details={{
                advancedDescriptions: [
                  {
                    categoryName: 'Fonctions',
                    infos: ["Fonctions d'appui au pont"],
                  },
                ],
                arrete: 'Arrêté du 18 août 2015',
                validityDuration: '5 ans',
              }}
            />
            <CqItem
              owner={OWNER.CATALOG}
              level={''}
              capacite={'Sécurité'}
              itemName={'Certificat de formation de base à la sécurité'}
              itemId="3"
              itemSlug="certificat-de-formation-de-base-a-la-securite"
              details={{
                advancedDescriptions: [
                  {
                    categoryName: 'Fonctions',
                    infos: ["Fonctions d'appui au pont"],
                  },
                ],
                arrete: 'Arrêté du 18 août 2015',
                validityDuration: '5 ans',
              }}
            />
          </div>
          <div class="rf-col">
            <SectionHead
              subtitle="Suggestions pour exercer des"
              title="Fonctions spécifiques"
              color={FONT_COLORS.G800}
            />
            <CqItem
              owner={OWNER.CATALOG}
              level={''}
              capacite={'Médicale'}
              itemName={'Formation médicale de base '}
              itemId="4"
              itemSlug="formation-medicale-de-base"
              details={{
                advancedDescriptions: [
                  {
                    categoryName: 'Fonctions',
                    infos: ["Fonctions d'appui au pont"],
                  },
                ],
                arrete: 'Arrêté du 18 août 2015',
                validityDuration: '5 ans',
              }}
            />
            <CqItem
              owner={OWNER.CATALOG}
              level={''}
              capacite={'Sécurité'}
              itemName={'Certificat de formation de base à la sécurité'}
              itemId="5"
              itemSlug="certificat-de-formation-de-base-a-la-securite"
              details={{
                advancedDescriptions: [
                  {
                    categoryName: 'Fonctions',
                    infos: ["Fonctions d'appui au pont"],
                  },
                ],
                arrete: 'Arrêté du 18 août 2015',
                validityDuration: '5 ans',
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewTitleChoice;
