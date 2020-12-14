package fr.gouv.mte.capqualif.marin.adapters.in.web;

import fr.gouv.mte.capqualif.marin.application.ports.in.GetSailorBasicDataUseCase;
import fr.gouv.mte.capqualif.marin.domain.Sailor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sailors")
public class GetSailorBasicDataController {

    @Autowired
    private GetSailorBasicDataUseCase getSailorBasicDataUseCase;

    @GetMapping("/{sailorNumber}")
    public Sailor getSailorBasicData (@PathVariable("sailorNumber") String id) {
        return getSailorBasicDataUseCase.getSailorBasicData(id);
    }
}
