package fr.gouv.mte.capqualif.capqualif.instruction.domain;

public class MarinData {

    private String value;
    private String endOfValidity;

    public MarinData(String value, String endOfValidity) {
        this.value = value;
        this.endOfValidity = endOfValidity;
    }

    public MarinData(String value) {
        this.value = value;
    }

    public MarinData() {
    }

    public String getValue() {
        return value;
    }

    public String getEndOfValidity() {
        return endOfValidity;
    }

    @Override
    public String toString() {
        return "MarinData{" +
                "value='" + value + '\'' +
                ", endOfValidity='" + endOfValidity + '\'' +
                '}';
    }
}
