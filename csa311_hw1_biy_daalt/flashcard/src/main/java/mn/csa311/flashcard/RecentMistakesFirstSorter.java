package mn.csa311.flashcard;

import java.util.ArrayList;
import java.util.List;

public class RecentMistakesFirstSorter implements CardOrganizer {

    @Override
    public List<Card> organize(List<Card> cards) {
        List<Card> result = new ArrayList<>();

        for (Card card : cards) {
            if (card.getMistakes() > 0) {
                result.add(card);
            }
        }

        for (Card card : cards) {
            if (card.getMistakes() == 0) {
                result.add(card);
            }
        }

        return result;
    }
}