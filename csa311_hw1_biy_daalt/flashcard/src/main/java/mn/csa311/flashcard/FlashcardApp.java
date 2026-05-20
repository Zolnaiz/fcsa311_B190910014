package mn.csa311.flashcard;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class FlashcardApp {

    public static void main(String[] args) throws IOException {
        if (args.length == 0 || hasOption(args, "--help")) {
            printHelp();
            return;
        }

        String fileName = args[0];
        String order = optionValue(args, "--order", "random");
        int repetitions = Integer.parseInt(optionValue(args, "--repetitions", "1"));
        boolean invertCards = hasOption(args, "--invertCards");

        List<Card> cards = loadCards(fileName, invertCards);

        if (cards.isEmpty()) {
            System.out.println("No cards found.");
            return;
        }

        if (order.equals("random")) {
            Collections.shuffle(cards);
        } else if (order.equals("recent-mistakes-first")) {
            cards = new RecentMistakesFirstSorter().organize(cards);
        } else if (!order.equals("worst-first")) {
            System.out.println("Invalid order: " + order);
            printHelp();
            return;
        }

        Scanner scanner = new Scanner(System.in);
        Set<Achievement> achievements = new LinkedHashSet<>();
        Map<Card, Integer> correctCounts = new HashMap<>();
        Map<Card, Integer> answerCounts = new HashMap<>();

        int totalCorrect = 0;
        int totalAnswers = 0;

        for (Card card : cards) {
            int correctForThisCard = 0;

            while (correctForThisCard < repetitions) {
                System.out.println();
                System.out.println("Question: " + card.getQuestion());
                System.out.print("Your answer: ");

                String userAnswer = scanner.nextLine();
                totalAnswers++;
                answerCounts.put(card, answerCounts.getOrDefault(card, 0) + 1);

                if (userAnswer.trim().equalsIgnoreCase(card.getAnswer().trim())) {
                    System.out.println("Correct!");
                    correctForThisCard++;
                    totalCorrect++;
                    correctCounts.put(card, correctCounts.getOrDefault(card, 0) + 1);
                } else {
                    System.out.println("Wrong. Correct answer: " + card.getAnswer());
                    card.addMistake();
                }

                if (answerCounts.get(card) > 5) {
                    achievements.add(Achievement.REPEAT);
                }

                if (correctCounts.getOrDefault(card, 0) >= 3) {
                    achievements.add(Achievement.CONFIDENT);
                }
            }
        }

        if (totalCorrect == totalAnswers) {
            achievements.add(Achievement.CORRECT);
        }

        System.out.println();
        System.out.println("Final score: " + totalCorrect + "/" + totalAnswers);

        System.out.println("Achievements:");
        if (achievements.isEmpty()) {
            System.out.println("- None");
        } else {
            for (Achievement achievement : achievements) {
                System.out.println("- " + achievement);
            }
        }
    }

    private static List<Card> loadCards(String fileName, boolean invertCards) throws IOException {
        List<Card> cards = new ArrayList<>();

        for (String line : Files.readAllLines(Path.of(fileName))) {
            if (line.isBlank() || line.startsWith("#")) {
                continue;
            }

            String[] parts = line.split("\\|", 2);

            if (parts.length != 2) {
                continue;
            }

            String question = parts[0].trim();
            String answer = parts[1].trim();

            if (invertCards) {
                cards.add(new Card(answer, question));
            } else {
                cards.add(new Card(question, answer));
            }
        }

        return cards;
    }

    private static boolean hasOption(String[] args, String option) {
        for (String arg : args) {
            if (arg.equals(option)) {
                return true;
            }
        }
        return false;
    }

    private static String optionValue(String[] args, String option, String defaultValue) {
        for (int i = 0; i < args.length - 1; i++) {
            if (args[i].equals(option)) {
                return args[i + 1];
            }
        }
        return defaultValue;
    }

    private static void printHelp() {
        System.out.println("Usage:");
        System.out.println("flashcard <cards-file> [options]");
        System.out.println();
        System.out.println("Options:");
        System.out.println("  --help");
        System.out.println("  --order <random|worst-first|recent-mistakes-first>");
        System.out.println("  --repetitions <num>");
        System.out.println("  --invertCards");
    }
}