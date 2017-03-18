package com.tully.api.interceptor;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InterceptorJWT extends HandlerInterceptorAdapter{

    private static final Logger logger = Logger.getLogger(InterceptorJWT.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logRequestInfo(request);
        return true;
    }

    public void logRequestInfo(HttpServletRequest request) {
        logger.info("ENDEREÇO IP: " + getRemoteAddress(request));
        logger.info("MÉTODO HTTP: " + request.getMethod().toString());
        logger.info("ROTA: " + request.getRequestURI());
    }

    private String getRemoteAddress(HttpServletRequest req) {
        String ipAddress = req.getHeader("X-FORWARDED-FOR");
        if (ipAddress != null) {
            ipAddress = ipAddress.replaceFirst(",.*", "");  // cares only about the first IP if there is a list
        } else {
            ipAddress = req.getRemoteAddr();
        }
        return ipAddress;
    }

}
