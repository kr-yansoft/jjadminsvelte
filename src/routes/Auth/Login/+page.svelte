<script>
    import { appOptions } from '../../../stores/appOptions';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { t } from '../../../i18n/i18n';
    import { locale } from 'svelte-i18n';

    let emailAddress = '';
    let password = '';
    let rememberMe = false;

    let userStore = { isLogin: false };

    const handleLogin = () => {

        userStore.isLogin = true;

        appOptions.update(options => {
            return {
                ...options,
                appSidebarHide: false,
                appHeaderHide: false,
                appContentClass: ''
            };
        });
        goto('/home/Dashboard'); 
    };

    onMount(() => {
        if (!userStore.isLogin) {
            appOptions.update(options => {
                return {
                    ...options,
                    appSidebarHide: true,
                    appHeaderHide: true,
                    appContentClass: 'p-0'
                };
            });
        }
    });
</script>
{#if $locale}
<div class="login login-with-news-feed">
	<div class="news-feed">
		<div class="news-image"></div>
		<div class="news-caption">
			<h4 class="caption-title"><b>J.J CASINO</b> Admin App</h4>
		</div>
	</div>
	
	<div class="login-container">
		<div class="login-header mb-30px">
			<div class="brand">
				<div class="d-flex align-items-center">
					<!-- <span class="logo"></span> -->
					<b class="me-2">J.J Casino</b> Admin
				</div>
				<!-- <small>Bootstrap 5 Responsive Admin Template</small> -->
			</div>
			<div class="icon">
				<i class="fa fa-sign-in-alt"></i>
			</div>
		</div>
		
		<div class="login-content">
			<form on:submit|preventDefault={handleLogin} method="POST" name="login_form" class="fs-13px">
				<div class="form-floating mb-15px">
					<input type="text" class="form-control h-45px fs-13px" placeholder="Email Address" id="emailAddress" />
					<label for="emailAddress" class="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
				</div>
				<div class="form-floating mb-15px">
					<input type="password" class="form-control h-45px fs-13px" placeholder="Password" id="password" />
					<label for="password" class="d-flex align-items-center fs-13px text-gray-600">Password</label>
				</div>
				<div class="form-check mb-30px">
					<input class="form-check-input" type="checkbox" value="1" id="rememberMe" />
					<label class="form-check-label" for="rememberMe">
						Remember Me
					</label>
				</div>
				<div class="mb-15px">
					<button type="submit" class="btn btn-theme d-block h-45px w-100 btn-lg fs-14px">Sign me in</button>
				</div>
				<div class="mb-40px pb-40px text-dark">
					Not a member yet? Click <a href="/user/register-v3" class="text-primary">here</a> to register.
				</div>
				<hr class="bg-gray-600 opacity-2" />
				<div class="text-gray-600 text-center  mb-0">
					&copy; J.J Casino All Right Reserved 2024
				</div>
			</form>
		</div>
	</div>
</div>
{/if}
<style scoped>
 .news-image{
    background: url(../../../img/2039.jfif);
  }
</style>
