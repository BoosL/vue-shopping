export default {
	data: function () {
		return {
			signature: ""
		}
	},
	methods: {
        goBack() {
            this.$router.go(-1);
        },
	},
	activated() {

		this.signature = window.localStorage.getItem('reg_info');

	}
}

