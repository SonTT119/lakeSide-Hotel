file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/ReviewController.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala3-library_3\3.3.3\scala3-library_3-3.3.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.12\scala-library-2.13.12.jar [exists ]
Options:



action parameters:
uri: file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/ReviewController.java
text:
```scala
package com.example.lakeside_hotel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.model.Review;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.ReviewResponse;
import com.example.lakeside_hotel.service.IReviewService;
import com.example.lakeside_hotel.service.IRoomService;
import com.example.lakeside_hotel.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final IReviewService reviewService;
    private final IUserService userService;
    private final IRoomService roomService;

    // create a new review
    @PostMapping("/add_review/room/{roomId}")
    public ResponseEntity<ReviewResponse> addReview(@PathVariable Long roomId,
            @RequestBody Review review) {

        Review savedReview = reviewService.addReview(getCurrentUser().getId(), roomId, review.getComment(),
                review.getRating());
        ReviewResponse reviewResponse = new ReviewResponse(savedReview.getReviewId(), savedReview.getComment(),
                savedReview.getRating());
        return ResponseEntity.ok(reviewResponse);
    }

    // get all reviews by room id
    @GetMapping("/get_reviews_by_room_id/{roomId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByRoomId(@PathVariable Long roomId) {
        List<Review> reviews = reviewService.getReviewsByRoomId(roomId);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponse reviewResponse = getReviewResponse(review);
            reviewResponses.add(reviewResponse);
        }
        return ResponseEntity.ok(reviewResponses);
    }

    // get rating average by room id
    @GetMapping("/get_rating_average_by_room_id/{roomId}")
    public ResponseEntity<Double> getRatingAverageByRoomId(@PathVariable Long roomId) {
        double averageRating = reviewService.calculateAverageRating(roomId);
        return ResponseEntity.ok(averageRating);
    }

    // get review count by room id
    @GetMapping("/get_review_count_by_room_id/{roomId}")
    public ResponseEntity<Long> getReviewCountByRoomId(@PathVariable Long roomId) {
        long reviewCount = reviewService.getReviewCount(roomId);
        return ResponseEntity.ok(reviewCount);
    }

    // get all reviews
    @GetMapping("/get_all_reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getUserByEmail(authentication.getName());
    }

    private ReviewResponse getReviewResponse(Review review) {
        return new ReviewResponse(review.getReviewId(), review.getComment(), review.getRating(), review.getUser());
    }
}
```



#### Error stacktrace:

```
scala.collection.Iterator$$anon$19.next(Iterator.scala:973)
	scala.collection.Iterator$$anon$19.next(Iterator.scala:971)
	scala.collection.mutable.MutationTracker$CheckedIterator.next(MutationTracker.scala:76)
	scala.collection.IterableOps.head(Iterable.scala:222)
	scala.collection.IterableOps.head$(Iterable.scala:222)
	scala.collection.AbstractIterable.head(Iterable.scala:933)
	dotty.tools.dotc.interactive.InteractiveDriver.run(InteractiveDriver.scala:168)
	scala.meta.internal.pc.MetalsDriver.run(MetalsDriver.scala:45)
	scala.meta.internal.pc.PcCollector.<init>(PcCollector.scala:44)
	scala.meta.internal.pc.PcSemanticTokensProvider$Collector$.<init>(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector$lzyINIT1(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.provide(PcSemanticTokensProvider.scala:90)
	scala.meta.internal.pc.ScalaPresentationCompiler.semanticTokens$$anonfun$1(ScalaPresentationCompiler.scala:110)
```
#### Short summary: 

java.util.NoSuchElementException: next on empty iterator