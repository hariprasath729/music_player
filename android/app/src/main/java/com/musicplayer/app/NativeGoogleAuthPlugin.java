package com.musicplayer.app;

import android.content.Intent;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

@CapacitorPlugin(name = "NativeGoogleAuth")
public class NativeGoogleAuthPlugin extends Plugin {
    // Google ID tokens must use the server/web client as their audience.
    private static final String SERVER_CLIENT_ID =
        "711494761481-2r3hdi3cdesd3qa7b5cetgr2kudnqj6m.apps.googleusercontent.com";

    @PluginMethod
    public void signIn(PluginCall call) {
        GoogleSignInOptions options = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken(SERVER_CLIENT_ID)
            .build();

        Intent intent = GoogleSignIn.getClient(getActivity(), options).getSignInIntent();
        startActivityForResult(call, intent, "googleSignInResult");
    }

    @ActivityCallback
    private void googleSignInResult(PluginCall call, ActivityResult result) {
        if (result.getResultCode() != android.app.Activity.RESULT_OK || result.getData() == null) {
            call.reject("Google sign-in was cancelled");
            return;
        }

        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(result.getData());
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            String idToken = account == null ? null : account.getIdToken();
            if (idToken == null || idToken.isEmpty()) {
                call.reject("Google did not return an ID token");
                return;
            }

            JSObject response = new JSObject();
            response.put("idToken", idToken);
            call.resolve(response);
        } catch (ApiException error) {
            call.reject("Google sign-in failed", error);
        }
    }

    @PluginMethod
    public void signOut(PluginCall call) {
        GoogleSignIn.getClient(getActivity(), GoogleSignInOptions.DEFAULT_SIGN_IN)
            .signOut()
            .addOnCompleteListener(task -> call.resolve());
    }
}
