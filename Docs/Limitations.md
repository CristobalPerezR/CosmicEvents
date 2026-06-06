# Limitations

This project was developed as a prototype project and does not currently implement several features that would be recommended for a production environment.

## Authentication & Security

* Password strength requirements are not enforced.
* Email verification is not required during registration.
* Password reset via email is not implemented.
* Two-factor authentication (2FA) is not supported.
* Account lockout after multiple failed login attempts is not implemented.
* Password and Email updates are not implemented.
* The JWT is currently stored in **localStorage**. It should be moved to an **HttpOnly cookie** for better security.

## Infrastructure

* Automated backups are not configured.
* Redis were configure only for test purposes, in other cases can be used in a efficient way.

## Pages

* Some informational pages, such as **About Us**, **Main Page**, and **What is this site?**, have not been implemented.