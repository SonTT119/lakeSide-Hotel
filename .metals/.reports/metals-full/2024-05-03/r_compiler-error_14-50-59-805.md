file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/AuthController.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala3-library_3\3.3.3\scala3-library_3-3.3.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.12\scala-library-2.13.12.jar [exists ]
Options:



action parameters:
uri: file:///D:/lakeSide_Hotel/lakeSide-Hotel/be/src/main/java/com/example/lakeside_hotel/controller/AuthController.java
text:
```scala
package com.example.lakeside_hotel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.exception.UserAlreadyExistException;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.JwtResponse;
import com.example.lakeside_hotel.request.LoginRequest;
import com.example.lakeside_hotel.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IUserService userService;
    // private final AuthenticationManager authenticationManager;
    // private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest
    // loginRequest) {
    // try {
    // // Lấy thông tin người dùng từ yêu cầu đăng nhập
    // String email = loginRequest.getEmail();
    // String password = loginRequest.getPassword();

    // // Xác thực người dùng với mật khẩu mới
    // Authentication authenticateAction = authenticationManager.authenticate(
    // new UsernamePasswordAuthenticationToken(email, password));
    // SecurityContextHolder.getContext().setAuthentication(authenticateAction);

    // // Tạo mã thông báo JWT mới với mật khẩu mới
    // String jwt = jwtUtils.generateJwtTokenForUser(authenticateAction);
    // HotelUserDetail userDetails = (HotelUserDetail)
    // authenticateAction.getPrincipal();
    // List<String> roles = userDetails.getAuthorities().stream().map(item ->
    // item.getAuthority())
    // .collect(Collectors.toList());

    // // Trả về mã thông báo JWT mới và thông tin người dùng
    // return ResponseEntity.ok(new JwtResponse(userDetails.getId(),
    // userDetails.getEmail(), jwt, roles));
    // } catch (BadCredentialsException e) {
    // // Handle incorrect email or password
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email
    // or password");
    // } catch (AccessDeniedException e) {
    // // Handle unauthorized access
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    // .body("You are not authorized to access this resource");
    // }
    // }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
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