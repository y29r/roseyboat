// One-time video conversion script
// Converts MOV source files to web-optimized MP4 + poster frames
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

const ROOT = path.join(__dirname, "..");
const INPUT = path.join(ROOT, "content");
const OUTPUT = path.join(ROOT, "public", "videos");

if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

function convertVideo(inputFile, outputFile, opts = {}) {
	const { crf = 26, scale = "1280:720", label = outputFile } = opts;
	return new Promise((resolve, reject) => {
		console.log(`\n▶ Converting: ${label}`);
		ffmpeg(inputFile)
			.videoCodec("libx264")
			.audioCodec("aac")
			.audioBitrate("96k")
			.addOutputOption("-crf", String(crf))
			.addOutputOption("-preset", "slow")
			.addOutputOption("-vf", `scale=${scale}:flags=lanczos`)
			.addOutputOption("-movflags", "+faststart")
			.addOutputOption("-pix_fmt", "yuv420p")
			.output(outputFile)
			.on("progress", (p) => {
				if (p.percent) process.stdout.write(`  ${Math.round(p.percent)}%\r`);
			})
			.on("end", () => {
				const size = (fs.statSync(outputFile).size / 1024 / 1024).toFixed(2);
				console.log(`  ✓ Done → ${path.basename(outputFile)} (${size} MB)`);
				resolve();
			})
			.on("error", (err) => {
				console.error(`  ✗ Error: ${err.message}`);
				reject(err);
			})
			.run();
	});
}

function extractPoster(inputFile, outputFile, timeOffset = "00:00:03") {
	return new Promise((resolve, reject) => {
		console.log(`  Extracting poster from ${path.basename(inputFile)} at ${timeOffset}`);
		ffmpeg(inputFile)
			.screenshots({
				timestamps: [timeOffset],
				filename: path.basename(outputFile),
				folder: path.dirname(outputFile),
				size: "1280x720",
			})
			.on("end", () => {
				console.log(`  ✓ Poster → ${path.basename(outputFile)}`);
				resolve();
			})
			.on("error", (err) => {
				console.error(`  ✗ Poster error: ${err.message}`);
				reject(err);
			});
	});
}

async function main() {
	const boatPreview = path.join(INPUT, "boatpreview.mov");
	const experience = path.join(INPUT, "whatitsliketostayonanarrowboat.mov");

	// Hero loop: heavily compressed, small dimensions, silent-friendly
	await convertVideo(boatPreview, path.join(OUTPUT, "hero-loop.mp4"), {
		crf: 32,
		scale: "1280:720",
		label: "hero-loop.mp4 (hero background)",
	});

	// Main featured video: good quality for full-width display
	await convertVideo(boatPreview, path.join(OUTPUT, "boat-preview.mp4"), {
		crf: 24,
		scale: "1280:720",
		label: "boat-preview.mp4 (main section featured)",
	});

	// Experience / lifestyle video
	await convertVideo(experience, path.join(OUTPUT, "narrowboat-experience.mp4"), {
		crf: 24,
		scale: "1280:720",
		label: "narrowboat-experience.mp4 (secondary clip)",
	});

	// Poster frames
	await extractPoster(boatPreview, path.join(OUTPUT, "poster-hero.jpg"), "00:00:02");
	await extractPoster(boatPreview, path.join(OUTPUT, "poster-preview.jpg"), "00:00:04");
	await extractPoster(experience, path.join(OUTPUT, "poster-experience.jpg"), "00:00:03");

	console.log("\n✅ All conversions complete.\n");

	// Print final sizes
	const files = fs.readdirSync(OUTPUT);
	console.log("Output files:");
	files.forEach((f) => {
		const s = (fs.statSync(path.join(OUTPUT, f)).size / 1024 / 1024).toFixed(2);
		console.log(`  ${f.padEnd(36)} ${s} MB`);
	});
}

main().catch((err) => {
	console.error("Fatal:", err);
	process.exit(1);
});
