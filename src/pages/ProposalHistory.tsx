import { useState, useMemo, useRef } from "react";
import { useProposalHistory, StoredProposal } from "@/hooks/useProposalHistory";
import { ProposalPreview } from "@/components/ProposalPreview";
import { usePdfExport } from "@/hooks/usePdfExport";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROGRAM_OPTIONS } from "@/types/proposal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Download, Search, FileText, Calendar, Filter, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProposalHistory = () => {
    const { history, deleteProposal, clearHistory } = useProposalHistory();
    const { exportToPdf } = usePdfExport();
    const { toast } = useToast();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState<string>("all");
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedProgram, setSelectedProgram] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("date-desc");

    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const hiddenPreviewRef = useRef<HTMLDivElement>(null);
    const [previewData, setPreviewData] = useState<StoredProposal | null>(null);

    // Get unique years from history
    const availableYears = useMemo(() => {
        const years = new Set(history.map(p => new Date(p.timestamp).getFullYear()));
        return Array.from(years).sort((a, b) => b - a);
    }, [history]);

    const filteredProposals = useMemo(() => {
        return history.filter((proposal) => {
            const date = new Date(proposal.timestamp);
            const matchesSearch = proposal.data.collegeName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMonth = selectedMonth === "all" || date.getMonth().toString() === selectedMonth;
            const matchesYear = selectedYear === "all" || date.getFullYear().toString() === selectedYear;
            const matchesProgram = selectedProgram === "all" || proposal.data.programName === selectedProgram;

            return matchesSearch && matchesMonth && matchesYear && matchesProgram;
        }).sort((a, b) => {
            switch (sortOrder) {
                case "name-asc":
                    return a.data.collegeName.localeCompare(b.data.collegeName);
                case "name-desc":
                    return b.data.collegeName.localeCompare(a.data.collegeName);
                case "program-asc":
                    return a.data.programName.localeCompare(b.data.programName);
                case "program-desc":
                    return b.data.programName.localeCompare(a.data.programName);
                case "date-asc":
                    return a.timestamp - b.timestamp;
                case "date-desc":
                default:
                    return b.timestamp - a.timestamp;
            }
        });
    }, [history, searchTerm, selectedMonth, selectedYear, selectedProgram, sortOrder]);

    const handleDownload = async (proposal: StoredProposal) => {
        setDownloadingId(proposal.id);
        setPreviewData(proposal);

        // Allow React to render the hidden preview with new data
        setTimeout(async () => {
            try {
                if (hiddenPreviewRef.current) {
                    await exportToPdf(hiddenPreviewRef.current, proposal.data);
                    toast({
                        title: "Download Successful",
                        description: "Proposal PDF has been generated again.",
                    });
                }
            } catch (error) {
                toast({
                    title: "Download Failed",
                    description: "Could not generate PDF.",
                    variant: "destructive",
                });
            } finally {
                setDownloadingId(null);
                setPreviewData(null);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Proposal Repository</h1>
                            <p className="text-sm text-muted-foreground">Manage and retrieve past proposals</p>
                        </div>
                    </div>
                </div>



                {/* Filters & Controls */}
                <div className="bg-card border border-border rounded-xl p-4 mb-8 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by college name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                            <SelectTrigger className="w-[180px]">
                                <FileText className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="All Programs" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Programs</SelectItem>
                                {PROGRAM_OPTIONS.map((program) => (
                                    <SelectItem key={program} value={program}>
                                        {program}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[140px]">
                                <Calendar className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Months</SelectItem>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <SelectItem key={i} value={i.toString()}>
                                        {format(new Date(2024, i, 1), "MMMM")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-[120px]">
                                <Calendar className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Years</SelectItem>
                                {availableYears.map(year => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger className="w-[160px]">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date-desc">Newest First</SelectItem>
                                <SelectItem value="date-asc">Oldest First</SelectItem>
                                <SelectItem value="name-asc">College (A-Z)</SelectItem>
                                <SelectItem value="name-desc">College (Z-A)</SelectItem>
                                <SelectItem value="program-asc">Program (A-Z)</SelectItem>
                                <SelectItem value="program-desc">Program (Z-A)</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="h-9 w-px bg-border mx-1" />

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon" title="Clear Repository" disabled={history.length === 0}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Clear Entire Repository?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all saved proposals. This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            clearHistory();
                                            toast({
                                                title: "Repository Cleared",
                                                description: "All proposals have been removed.",
                                            });
                                        }}
                                        className="bg-destructive hover:bg-destructive/90"
                                    >
                                        Clear All
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                {/* Proposals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProposals.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="text-lg font-medium">No proposals found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredProposals.map((proposal) => (
                            <div key={proposal.id} className="relative group bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                                        {format(proposal.timestamp, "MMM d, yyyy")}
                                    </span>
                                </div>


                                <h3 className="font-semibold text-lg mb-1 truncate" title={proposal.data.collegeName}>
                                    {proposal.data.collegeName}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {proposal.data.programName}
                                </p>

                                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm">
                                    <div className="flex flex-col text-xs text-muted-foreground">
                                        <span>{format(proposal.timestamp, "h:mm a")}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Proposal?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete the proposal for <span className="font-semibold">{proposal.data.collegeName}</span> - <span className="font-medium text-foreground">{proposal.data.programName}</span>? This cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => {
                                                            deleteProposal(proposal.id);
                                                            toast({
                                                                title: "Proposal Deleted",
                                                                description: "The proposal has been removed from your repository.",
                                                            });
                                                        }}
                                                        className="bg-destructive hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-2"
                                            onClick={() => handleDownload(proposal)}
                                            disabled={downloadingId === proposal.id}
                                        >
                                            {downloadingId === proposal.id ? (
                                                <span className="animate-spin">⏳</span>
                                            ) : (
                                                <Download className="w-4 h-4" />
                                            )}
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card mt-12">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Connect Training Solutions (P) Ltd. All rights reserved.</p>
                </div>
            </footer>

            {/* Hidden Preview for PDF Generation */}
            <div className="fixed left-[-9999px] top-0">
                <div ref={hiddenPreviewRef} className="w-[800px]">
                    {previewData && <ProposalPreview data={previewData.data} />}
                </div>
            </div>
        </div>
    );
};

export default ProposalHistory;
