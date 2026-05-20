package mn.csa311.flashcard;

public class Card {

    private final String question;
    private final String answer;
    private int mistakes;

    public Card(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.mistakes = 0;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public int getMistakes() {
        return mistakes;
    }

    public void addMistake() {
        mistakes++;
    }
}