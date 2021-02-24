package fr.gouv.mte.capqualif.shared;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import fr.gouv.mte.capqualif.instruction.domain.Entry;
import fr.gouv.mte.capqualif.legislateur.mock.DataToExtractFromExistingDataSource;
import fr.gouv.mte.capqualif.legislateur.mock.EntryInExistingDataSource;
import fr.gouv.mte.capqualif.legislateur.mock.ParentKey;
import fr.gouv.mte.capqualif.titre.domain.Value;
import fr.gouv.mte.capqualif.titre.domain.enums.DataType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class JsonExtractor {

    @Autowired
    TimeConverter timeConverter;

    public List<Entry> getWantedData(JsonElement json, DataToExtractFromExistingDataSource dataToExtractFromExistingDataSource) {
        JsonObject jsonPortionMatchingConditionValue = findJsonObjectByEntry(json,
                new Entry(dataToExtractFromExistingDataSource.get, dataToExtractFromExistingDataSource.getEntryInExistingDataSourceOfMainWantedData().getValue())
        );
        return extractWantedDataFromJson(jsonPortionMatchingConditionValue, dataToExtractFromExistingDataSource);
    }

    // ============================ 1. Let's find the json object that contains the data we want ============================

    public JsonObject findJsonObjectByEntry(JsonElement jsonElement, Entry wantedEntry) {

        // In case you don't know: an entry is a "key:value" pair. Example: for entry "bestMeal:kebab", entry key is
        // "bestMeal" and entry value is "kebab".
        // Here, we are looking for a json object containing a specific entry

        if (jsonElement instanceof JsonArray) {
            JsonArray jsonArray = (JsonArray) jsonElement;
            for (JsonElement element : jsonArray) {
                if (element instanceof JsonObject) {
                    JsonObject matchingJsonObject = findMatchingJsonObject((JsonObject) element, wantedEntry.getKey(), wantedEntry.getValue());
                    if (matchingJsonObject != null)
                        return findMatchingJsonObject((JsonObject) element, wantedEntry.getKey(),
                                wantedEntry.getValue());
                }
            }
        }
        if (jsonElement instanceof JsonObject) {
            return findMatchingJsonObject((JsonObject) jsonElement, wantedEntry.getKey(), wantedEntry.getValue());
        }
        return null;
    }

    private JsonObject findMatchingJsonObject(JsonObject jsonObject, String wantedKey, Value wantedValue) {
        if (jsonObject.has(wantedKey)) {
            if (hasWantedValue(jsonObject, wantedKey, wantedValue)) {
                return jsonObject;
            }
        } else {
            return findMatchingNestedJsonObject(jsonObject, wantedKey, wantedValue);
        }
        return null;
    }

    private JsonObject findMatchingNestedJsonObject(JsonObject jsonObject, String wantedKey, Value wantedValue) {
        for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
            if (entry.getValue() instanceof JsonObject) {
                JsonObject nestedJsonObject = (JsonObject) entry.getValue();
                if (nestedJsonObject.has(wantedKey)) {
                    if (hasWantedValue(nestedJsonObject, wantedKey, wantedValue)) {
                        return jsonObject;
                    } else {
                        findMatchingNestedJsonObject(nestedJsonObject, wantedKey, wantedValue);
                    }
                }
            }
        }
        return null;
    }

    private boolean hasWantedValue(JsonObject jsonObject, String wantedKey, Value wantedValue) {
        if (wantedValue.getType() == DataType.DATE) {
            return checkDate(jsonObject, wantedKey, wantedValue.getContent());
        }
        if (wantedValue.getType() == DataType.STRING) {
            return jsonObject.get(wantedKey).getAsString().equals(wantedValue.getContent());
        }
        return false;
    }

    private boolean checkDate(JsonObject jsonObject, String wantedKey, String wantedValue) {
        LocalDate wantedDate = timeConverter.convertToLocalDate(wantedValue);
        LocalDate testedDate = timeConverter.convertToLocalDate(jsonObject.get(wantedKey).getAsString());
        return testedDate.isBefore(wantedDate);
    }

    // ============================== End of step 1 =============================================

    // ============================ 2. Let's extract all the data we want ============================

    private List<Entry> extractWantedDataFromJson(JsonObject json,
                                                  DataToExtractFromExistingDataSource dataToExtractFromExistingDataSource) {
        if (json != null) {
            List<Entry> allData = new ArrayList<Entry>();

            // Let's add the main data!
            allData.add(findEntryByWantedKey(json, dataToExtractFromExistingDataSource.getEntryInExistingDataSourceOfMainWantedData()));

            // Let's add additional data!
            if (dataToExtractFromExistingDataSource.getKeysOfAdditionalWantedData() != null) {
                for (EntryInExistingDataSource entryInExistingDataSourceOfAdditionalWantedData :
                        dataToExtractFromExistingDataSource.getKeysOfAdditionalWantedData()) {
                    allData.add(findEntryByWantedKey(json, entryInExistingDataSourceOfAdditionalWantedData));
                }
            }

            return allData;
        }
        return Collections.emptyList();
    }

    private Entry findEntryByWantedKey(JsonObject json, EntryInExistingDataSource wantedEntryInExistingDataSource) {
        JsonObject source = json;
        Entry entry;
        if (wantedEntryInExistingDataSource.isNested()) {
            entry = findNestedEntryByWantedKey(source, wantedEntryInExistingDataSource);
            source = json;
        } else {
            entry = createEntry(json, wantedEntryInExistingDataSource.getKey(), wantedEntryInExistingDataSource.getValue().getType());
        }
        return entry;
    }

    // TO DO : Rewrite to sort positionKey (make them int)
    private Entry findNestedEntryByWantedKey(JsonObject source, EntryInExistingDataSource wantedEntryInExistingDataSource) {
        List<ParentKey> parentKeys = wantedEntryInExistingDataSource.getParentKeys();
        for (ParentKey parentKey : parentKeys) {
            for (int i = 1; i <= parentKeys.size(); i++) {
                if (parentKey.getPosition().toString().equals("POSITION_" + i) && (source.get(parentKey.getKeyRealNameInExistingDataSource()) instanceof JsonObject)) {
                    JsonObject jsonSource = (JsonObject) source.get(parentKey.getKeyRealNameInExistingDataSource());
                    source = jsonSource;
                }
            }
        }
        return createEntry(source, wantedEntryInExistingDataSource.getKey(), wantedEntryInExistingDataSource.getValue().getType());
    }

    private Entry createEntry(JsonObject source, String key, DataType valueType) {
        Value value =
                new Value(source.get(key).getAsString(), valueType);
        Entry entry = new Entry(key, value);
        return entry;
    }


    // ============================== End of step 2 =============================================
}
