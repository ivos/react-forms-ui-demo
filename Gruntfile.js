module.exports = function (grunt) {
	var config = grunt.file.readJSON('tools/config/production.json');
	var app = grunt.file.readJSON('package.json');
	grunt.initConfig({
		clean: ['target/'],
		exec: {
			build: {
				command: 'node tools/build-bundle'
			}
		},
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: 'src/public/',
					src: ['**'],
					dest: 'target/build/'
				}]
			}
		},
		cssmin: {
			build: {
				files: {
					'target/build/global-styles.css': [
						'src/css/typeahead.css',
						'src/css/app.css'
					]
				}
			}
		},
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
					cwd: 'target/build/',
					src: ['**'],
					dest: '/app/',
					stream: true
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-aws-s3');

	grunt.registerTask('build', ['clean', 'exec:build', 'copy:build', 'cssmin:build']);
	grunt.registerTask('deploy', ['aws_s3:deployProduction']);
};
