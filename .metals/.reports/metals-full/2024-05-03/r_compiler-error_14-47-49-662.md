file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/ForgoPasswordController.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala3-library_3\3.3.3\scala3-library_3-3.3.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.12\scala-library-2.13.12.jar [exists ]
Options:



action parameters:
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

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/forgotPassword")
public class ForgoPasswordController {

    private final IUserService userService;

    private final IEmailService emailService;

    private final IForgotPasswordService forgotPasswordService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        if (!isValidEmail(email)) {
            return ResponseEntity.badRequest().body("Invalid email address");
        }
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        Integer otp = otpGenerator();
        MailBody mailBody = MailBody.builder().to(email)
                .subject("OTP for Forgot Password request")
                .text("This is the OTP for your Forgot Password request: " + otp)
                .build();
        ForgotPassword forgotPassword = new ForgotPassword();
        forgotPassword.setOtp(otp);
        forgotPassword.setExpiryDate(new Date(System.currentTimeMillis() + 70 * 1000));
        forgotPassword.setUser(user);
        forgotPasswordService.save(forgotPassword);
        emailService.sendSimpleMessage(mailBody);
        return ResponseEntity.ok("Email sent for verification");
    }

    // Validate email address format
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        ForgotPassword forgotPassword = forgotPasswordService.getForgotPasswordByOtpAndUser(otp, user);
        if (forgotPassword == null) {
            return new ResponseEntity<>("Invalid OTP", HttpStatus.EXPECTATION_FAILED);
        }
        if (forgotPassword.getExpiryDate().before(Date.from(Instant.now()))) {
            forgotPasswordService.deleteById(forgotPassword.getId());
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }
        forgotPasswordService.deleteById(forgotPassword.getId());
        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ForgotPasswordRequest forgotPasswordRequest,
            @PathVariable String email) {
        String newPassword = forgotPasswordRequest.getNewPassword();
        if (!newPassword.equals(forgotPasswordRequest.getConfirmPassword())) {
            return new ResponseEntity<>("Please enter the same password in both fields", HttpStatus.BAD_REQUEST);
        }
        String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new UserAlreadyExistException(
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character and no whitespace");
        }
        String encodedPassword = passwordEncoder.encode(forgotPasswordRequest.getNewPassword());
        userService.updatePasswordByEmail(email, encodedPassword);
        // userService.updatePasswordByEmail(email,
        // forgotPasswordRequest.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
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