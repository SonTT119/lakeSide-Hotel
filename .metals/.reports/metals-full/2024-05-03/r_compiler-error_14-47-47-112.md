file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/ForgoPasswordController.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala3-library_3\3.3.3\scala3-library_3-3.3.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.12\scala-library-2.13.12.jar [exists ]
Options:



action parameters:
offset: 1413
uri: file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/ForgoPasswordController.java
text:
```scala
package com.example.lakeside_hotel.controller;

import java.time.Instant;
import java.util.Date;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.email.IEmailService;
import com.example.lakeside_hotel.email.MailBody;
import com.example.lakeside_hotel.exception.UserAlreadyExistException;
import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.request.ForgotPasswordRequest;
import com.example.lakeside_hotel.service.IForgotPasswordService;
import com.example.lakeside_hotel.service.IUserService;
import com.example.lakeside_hotel.service.implement.ForgotPasswordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/forgotPassword")
public class ForgoPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/verifyE@@mail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        forgotPasswordService.sendVerificationEmail(email);
        return ResponseEntity.ok("Email sent for verification");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        return ResponseEntity.ok(forgotPasswordService.verifyOtp(otp, email));
    }

    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ForgotPasswordRequest forgotPasswordRequest,
                                                         @PathVariable String email) {
        forgotPasswordService.resetPassword(email, forgotPasswordRequest.getNewPassword(), forgotPasswordRequest.getConfirmPassword());
        return ResponseEntity.ok("Password updated successfully");
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
	scala.meta.internal.pc.HoverProvider$.hover(HoverProvider.scala:34)
	scala.meta.internal.pc.ScalaPresentationCompiler.hover$$anonfun$1(ScalaPresentationCompiler.scala:368)
```
#### Short summary: 

java.util.NoSuchElementException: next on empty iterator