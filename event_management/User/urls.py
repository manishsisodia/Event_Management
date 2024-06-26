from django.urls import path,include
from .views import  Registration,Login,ForgotPassword,ChangePasswordLogic,ChatLogic,Userinfo,RegistrationViewSet,LoginViewSet,ForgotPasswordViewSet,ChatLogicViewSet


from rest_framework.routers import DefaultRouter

router=DefaultRouter()


router.register("registration",RegistrationViewSet,basename="registration")
router.register("login",LoginViewSet,basename="login")
router.register("forgotpassword",ForgotPasswordViewSet,basename="forgotpassword")
router.register("chatlogicviewset",ChatLogicViewSet,basename="chatviewset")



urlpatterns=[
    path("register/",Registration.as_view(),name="register"),
    path("login/",Login.as_view(),name="Login"),
    path("forgot_password/",ForgotPassword.as_view(),name="forgot_password"),
    path("change_password/<token>/",ChangePasswordLogic.as_view(),name="change_password"),
    path("chat/",ChatLogic.as_view(),name="chat"),
    path("user_info/",Userinfo.as_view(),name="userinfo"),


    path("userviewset/",include(router.urls))
]