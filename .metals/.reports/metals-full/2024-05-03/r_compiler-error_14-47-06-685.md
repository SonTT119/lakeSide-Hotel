file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/service/implement/ForgotPasswordService.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala3-library_3\3.3.3\scala3-library_3-3.3.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.12\scala-library-2.13.12.jar [exists ]
Options:



action parameters:
uri: file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/service/implement/ForgotPasswordService.java
text:
```scala
package com.example.lakeside_hotel.service.implement;

import java.time.Instant;
import java.util.Date;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.email.IEmailService;
import com.example.lakeside_hotel.email.MailBody;
import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.repository.ForgotPasswordRepository;
import com.example.lakeside_hotel.service.IForgotPasswordService;
import com.example.lakeside_hotel.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService implements IForgotPasswordService {
    private final IUserService userService;
    private final IEmailService emailService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private ForgotPasswordRequest forgotPasswordRequest;
    

    @Override
    public void save(ForgotPassword forgotPassword) {
        forgotPasswordRepository.save(forgotPassword);
    }

    @Override
    public ForgotPassword getForgotPasswordByOtpAndUser(Integer otp, User user) {
        return forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + user.getEmail()));
    }

    @Override
    public void deleteById(Long id) {
        forgotPasswordRepository.deleteById(id);
    }

    @Override
    public void sendVerificationEmail(String email) {
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email address");
        }
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        Integer otp = otpGenerator();
        // Send verification email
        MailBody mailBody = MailBody.builder().to(email)
                .subject("OTP for Forgot Password request")
                .text("This is the OTP for your Forgot Password request: " + otp)
                .build();

        emailService.sendSimpleMessage(mailBody);
        // Save OTP and user info in database
        ForgotPassword forgotPassword = new ForgotPassword();
        forgotPassword.setOtp(otp);
        forgotPassword.setExpiryDate(Date.from(Instant.now().plusSeconds(70)));
        forgotPassword.setUser(user);
        forgotPasswordRepository.save(forgotPassword);
    }

    @Override
    public String verifyOtp(Integer otp, String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        ForgotPassword forgotPassword = getForgotPasswordByOtpAndUser(otp, user);
        if (forgotPassword == null) {
            throw new IllegalArgumentException("Invalid OTP");
        }
        if (forgotPassword.getExpiryDate().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.delete(forgotPassword);
            throw new IllegalArgumentException("OTP has expired");
        }
        forgotPasswordRepository.delete(forgotPassword);
        return "OTP verified successfully";
    }

    @Override
    public void resetPassword(String email, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Please enter the same password in both fields");
        }
        String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new IllegalArgumentException(
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character and no whitespace");
        }
        //mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(forgotPasswordRequest.getNewPassword());

        userService.updatePasswordByEmail(email, newPassword);
    }

    // Validate email address format
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
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