package fr.gouv.mte.capqualif.instructeur.adapters.in.web;

import fr.gouv.mte.capqualif.instructeur.adapters.out.api.GetMarinDataAdapter;
import fr.gouv.mte.capqualif.instructeur.application.ports.in.CompareMarinDataToConditionsTitreUseCase;
import fr.gouv.mte.capqualif.instructeur.domain.ComparisonResult;
import fr.gouv.mte.capqualif.legislateur.mock.ConditionDataSourceToDataToSearchForInExistingDataSourceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instruction/comparaison")
@CrossOrigin
public class CompareMarinDataToConditionsTitreController {

    @Autowired
    CompareMarinDataToConditionsTitreUseCase compareMarinDataToConditionsTitreUseCase;

    @GetMapping("/{titreId}/{numeroDeMarin}")
    public List<ComparisonResult> compareSailorDataToTitleConditions(
            @PathVariable("titreId") String titreId,
            @PathVariable("numeroDeMarin") String numeroDeMarin) {
        return compareMarinDataToConditionsTitreUseCase.compareMarinDataToConditionsTitre(titreId, numeroDeMarin);
    }
}
