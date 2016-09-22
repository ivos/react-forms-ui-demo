module.exports = function (grunt) {
	var config = grunt.file.readJSON('tools/config/production.json');
	var app = grunt.file.readJSON('package.json');
	grunt.initConfig({
		aws_s3: {
			options: {
				accessKeyId: config.AWSAccessKeyId,
				secretAccessKey: config.AWSSecretKey,
				region: config.region,
				bucket: config.bucket
			},
			deployProduction: {
				files: [{
					expand: true,
					cwd: 'build/',
					src: ['**'],
					dest: '/app/',
					stream: true
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-aws-s3');

	grunt.registerTask('deploy', ['aws_s3:deployProduction']);
};
